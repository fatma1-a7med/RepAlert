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
  sale: any;

  constructor(
    private route: ActivatedRoute,
    private salesService: SalesService
  ) {}

  ngOnInit(): void {
    const saleId = this.route.snapshot.paramMap.get('id');
    if (saleId) {
      this.loadSaleDetails(parseInt(saleId, 10));
    }
  }

  loadSaleDetails(saleId: number) {
    this.salesService.getSaleDetails(saleId).subscribe(
      (data) => {
        this.sale = data.sale; // Assign the fetched sale data
        console.log('Sale details:', this.sale);
      },
      (error) => {
        console.error('Failed to fetch sale details', error);
      }
    );
  }
}
