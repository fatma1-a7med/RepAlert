import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../../services/user_services/user-services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-all-sales',
  standalone: true,
  imports: [CommonModule,FormsModule,MatIcon,RouterLink],
  templateUrl: './list-all-sales.component.html',
  styleUrl: './list-all-sales.component.css'
})
export class ListAllSalesComponent implements OnInit {
  sales: any[] = [];

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales() {
    this.salesService.getAllSales().subscribe(
      (data) => {
        this.sales = data;
        console.log('data:', data);
      },
      (error) => {
        console.error('Failed to fetch sales data', error);
        this.sales = [];
      }
    );
  }

  showDetails(sale: any) {
    console.log('Sale details:', sale); // You can replace this with your desired logic to show details
  }

}

