import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sales-list',
  standalone:true,
  imports:[FormsModule,CommonModule,RouterLink,MatIconModule],
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements OnInit {
  sales: any[] = [];
  users: any[] = [];
  selectedUserId: number = 0;
  userWithNoSalesMessage: string = '';
  selectedUser: any | undefined; 
  

  constructor(private salesService: AdminDashboardService) { }

  ngOnInit(): void {
    this.loadSales();
    this.loadUsers();
  }

  loadSales(): void {
    this.salesService.getSales().subscribe(data => {
      this.sales = data;
    });
  }

  loadUsers(): void {
    this.salesService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  filterSalesByUser(): void {
    console.log('Selected User ID:', this.selectedUserId);
    console.log('Users:', this.users);
  
    if (this.selectedUserId) {
      this.salesService.getSalesByUserId(this.selectedUserId).subscribe(sales => {
        console.log('Sales:', sales);
        this.sales = sales;
        this.userWithNoSalesMessage = sales.length === 0 ? `No sales yet ${this.getUserFullName(this.selectedUserId)}` : '';
        console.log('User With No Sales Message:', this.userWithNoSalesMessage);
      });
    } else {
      this.loadSales(); // Reload all sales if no user selected
    }
  }
  deleteSale(saleId: number): void {
    if (confirm('Are you sure you want to delete this sale?')) {
      this.salesService.deleteSale(saleId).subscribe(() => {
        // Remove the sale from the array
        this.sales = this.sales.filter(sale => sale.sales_id !== saleId);
      }, error => {
        console.error('Error deleting sale:', error);
        // Handle error scenario, e.g., show an error message
      });
    }
  }
  getUserFullName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? `${user.first_name} ${user.last_name}` : '';
  }
}
