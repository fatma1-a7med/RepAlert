import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-details',
  standalone:true,
  imports:[FormsModule,CommonModule,RouterLink],
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.css']
})
export class SalesDetailsComponent implements OnInit {
  saleId: number;
  sale: any;

  constructor(private route: ActivatedRoute, private salesService: AdminDashboardService) {
    this.saleId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.salesService.getSale(this.saleId).subscribe(data => {
      this.sale = data;
    });
  }
}
