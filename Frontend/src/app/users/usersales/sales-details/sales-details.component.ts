import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SalesService } from '../../../services/user_services/user-services.service';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-user-details',
  standalone: true,
  imports: [CommonModule,FormsModule,MatIcon,RouterModule],
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.css']
})
export class SalesUserDetailsComponent implements OnInit {
  saleId: number;
  sale: any;
  userInfo: any;

  constructor(private route: ActivatedRoute, private salesService: SalesService) {
    this.saleId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadSaleDetails(this.saleId);
  }

  loadSaleDetails(saleId: number) {
    this.salesService.getSaleDetails(saleId).subscribe(
      (data: any) => {
        this.sale = data.sale;
        console.log('Sale details:', this.sale);
      },
      (error) => {
        console.error('Failed to fetch sale details', error);
      }
    );
  }

}