import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SalesService } from '../../../services/user_services/user-services.service';

@Component({
  selector: 'app-show-doctor',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './show-doctor.component.html',
  styleUrl: './show-doctor.component.css'
})

export class ShowDoctorComponent implements OnInit {
  doctor: any = {};
  doctorId: number | undefined;

  constructor(private route: ActivatedRoute, private doctorService: SalesService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.doctorId = +id;
        console.log('Doctor ID:', this.doctorId); // Debugging output
        this.onload();
      } else {
        console.error('Doctor ID not found in route');
      }
    });
  }

  onload() {
    if (this.doctorId !== undefined) {
      this.doctorService.GetDoctorById(this.doctorId).subscribe(
        data => {
          this.doctor = data;
        },
        error => {
          console.error('Error fetching doctor data:', error);
        }
      );
    } else {
      console.error('Doctor ID is undefined');
    }
  }
}