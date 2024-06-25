import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales-edit',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './sales-edit.component.html',
  styleUrls: ['./sales-edit.component.css']
})
export class SalesEditComponent implements OnInit {
  saleId: number;
  adminId: number = 1;
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
    end_date: ''
  };

  users: any[] = [];
  formSubmitted = false;

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
    this.salesService.getUsersByAdmin(this.adminId).subscribe(data => {
      this.users = data;
    });
  }

  updateSale(): void {
    this.formSubmitted = true;

    if (this.isValidForm()) {
      this.salesService.updateSale(this.saleId, this.sale).subscribe(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Sale updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['admin-dashboard/sales']);
        });
      });
    }
  }

  cancel(): void {
    this.router.navigate(['admin-dashboard/sales']);
  }

  isValidForm(): boolean {
    const form = document.querySelector('form.needs-validation') as HTMLFormElement;
    return form.checkValidity();
  }
}
