import { Component, OnInit, ViewChild } from '@angular/core';
import { SalesService } from '../../../services/user_services/user-services.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MedrepDetailComponent } from '../../../admin-dashboard/medrep-detail/medrep-detail.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-list-all-sales',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MedrepDetailComponent,
    CommonModule,
    CurrencyPipe,
    RouterLink


  ],
  templateUrl: './list-all-sales.component.html',
  styleUrls: ['./list-all-sales.component.css']
})
export class ListAllSalesComponent implements OnInit {
  displayedColumns: string[] = ['product_name', 'total_units', 'target_units', 'unit_price', 'unit_target_price', 'total_actual_price', 'total_target_price', 'actions'];
  dataSource: MatTableDataSource<any>;
  sales: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private salesService: SalesService) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales() {
    this.salesService.getAllSales().subscribe(
      (data: any[]) => {
        this.sales = data;
        this.dataSource.data = this.sales;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Failed to fetch sales data', error);
        this.sales = [];
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
