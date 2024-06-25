import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales-list',
  standalone:true,
  imports:[CommonModule,FormsModule,RouterLink , MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  sales: any[] = [];
  filteredSales: any[] = [];
  users: any[] = [];
  selectedUserId?: number;
  userWithNoSalesMessage: string = '';
  pageSizeOptions: number[] = [5, 10, 25, 100];
  totalSales: number = 0;
  displayedColumns: string[] = ['product_name', 'percentageDifferenceUnits', 'percentageDifferencePrice', 'percentageDifferenceActualPrice', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private salesService: AdminDashboardService) {}

  ngOnInit(): void {
    this.loadSales();
    this.loadUsers();
  }

  loadSales(): void {
    this.salesService.getSales().subscribe(data => {
      this.sales = data;
      this.filteredSales = data;
      this.totalSales = this.sales.length;
      this.dataSource.data = this.sales;
      this.applyPaginator();
      this.calculatePercentageDifference();
    });
  }

  loadUsers(): void {
    this.salesService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  filterSalesByUser(): void {
    if (this.selectedUserId) {
      this.salesService.getSalesByUserId(this.selectedUserId).subscribe(sales => {
        this.sales = sales;
        this.filteredSales = sales;
        this.userWithNoSalesMessage = sales.length === 0 ? `No sales yet.` : '';
        this.totalSales = this.sales.length;
        this.dataSource.data = this.sales;
        this.applyPaginator();
        this.calculatePercentageDifference();

      }, error => {
        console.error('Error fetching sales:', error);
      });
    } else {
      this.loadSales();
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (filterValue) {
      this.filteredSales = this.sales.filter(sale =>
        sale.product_name.toLowerCase().includes(filterValue)
      );
      this.dataSource.data = this.filteredSales;
      this.totalSales = this.filteredSales.length;
      this.userWithNoSalesMessage = this.totalSales === 0 ? `No sales matched the filter.` : '';
    } else {
      this.filteredSales = this.sales;
      this.dataSource.data = this.filteredSales;
      this.totalSales = this.sales.length;
      this.userWithNoSalesMessage = '';
    }
    this.applyPaginator();
  }

  deleteSale(saleId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this sale?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.salesService.deleteSale(saleId).subscribe(() => {
          this.sales = this.sales.filter(sale => sale.sales_id !== saleId);
          this.filteredSales = this.filteredSales.filter(sale => sale.sales_id !== saleId);
          this.dataSource.data = this.filteredSales;
          this.totalSales = this.sales.length;
          this.applyPaginator();
          Swal.fire(
            'Deleted!',
            'The sale has been deleted.',
            'success'
          );
          this.loadSales();
          this.loadUsers();
        }, error => {
          console.error('Error deleting sale:', error);
          Swal.fire(
            'Error!',
            'An error occurred while deleting the sale.',
            'error'
          );
        });
      }
    });
  }
  

  getUserFullName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? `${user.first_name} ${user.last_name}` : '';
  }

  applyPaginator(): void {
    if (this.paginator) {
      this.paginator.firstPage();
      this.paginator.length = this.totalSales;
    }
  }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.dataSource.data = this.filteredSales.slice(startIndex, endIndex);
  }

  calculatePercentageDifference(): void {
    this.sales.forEach(sale => {
      sale.percentageDifferenceUnits = this.calculatePercentage(sale.total_units, sale.target_units);
      sale.percentageDifferencePrice = this.calculatePercentage(sale.unit_price, sale.unit_target_price);
      sale.percentageDifferenceActualPrice = this.calculatePercentage(sale.total_actual_price, sale.total_target_price);
    });
  }

  calculatePercentage(total: number, target: number): number {
    return ((total) / target) * 100;
  }
}