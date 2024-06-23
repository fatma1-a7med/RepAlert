import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-edit',
  standalone:true,
  imports:[FormsModule,CommonModule,RouterLink],
  templateUrl: './sales-edit.component.html',
  styleUrls: ['./sales-edit.component.css']
})
export class SalesEditComponent implements OnInit {
  saleId: number;
  sale: any = {
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
    
  };

  constructor(
    private route: ActivatedRoute,
    private salesService: AdminDashboardService,
    private router: Router
  ) {
    this.saleId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.salesService.getSale(this.saleId).subscribe(data => {
      this.sale = data;
    });
  }

  updateSale(): void {
    this.salesService.updateSale(this.saleId, this.sale).subscribe(() => {
      this.router.navigate(['admin-dashboard/sales']);
    });
  }
}
