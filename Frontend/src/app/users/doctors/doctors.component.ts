import { Component } from '@angular/core';
import { ListDoctorsComponent } from './list-doctors/list-doctors.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { ShowDoctorComponent } from './show-doctor/show-doctor.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../user/navbar/navbar.component';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [ListDoctorsComponent,AddDoctorComponent,ShowDoctorComponent, NavbarComponent,RouterOutlet],  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent {
  

}
