import { Component } from '@angular/core';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-add',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './sales-add.component.html',
  styleUrls: ['./sales-add.component.css']
})
export class SalesAddComponent {
  sale = {
    admin_id: '',
    user_id: '',
    total_units: '',
    unit_price: '',
    target_units: '',
    unit_target_price: '',
    total_target_price: '',
    total_actual_price: '',
    product_name: '',
    start_date: '',
    end_date: '',
    created_at: new Date(),
    updated_at: new Date()
  };
  users: any[] = [];
  constructor(private salesService: AdminDashboardService, private router: Router) { }

  ngOnInit(): void {
    this.salesService.getUsers().subscribe(users => {
      this.users = users;
    });

    this.salesService.me().subscribe(admin => {
      this.sale.admin_id = admin.admin.id;
      console.log('Admin ID set to:', this.sale.admin_id);
    });
  }

  addSale(): void {
    this.salesService.createSale(this.sale).subscribe(() => {
      this.router.navigate(['admin-dashboard/sales']);
    });

  }
}
