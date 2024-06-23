import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AddeditComponent } from '../addedit/addedit.component';
import { HttpClientModule } from '@angular/common/http'; 
import {MatDialog} from '@angular/material/dialog'
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { MatMenuTrigger } from '@angular/material/menu'
import { JarwisService } from '../../services/jarwis.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  medreps: any[] = [];
  loggedInAdmin: any;
  user: any;
  loading: boolean = true; 

  constructor(private _dialog: MatDialog,private adminService: AdminDashboardService,private authService: JarwisService) {}


  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser() {
    this.authService.getUser().subscribe(
      (response) => {
        this.user = response.user; // Assuming response has user details
        this.loggedInAdmin = response.admin; // Assuming response has admin details
        this.loading = false; // Set loading to false when data is fetched
      },
      (error) => {
        console.error('Failed to fetch user data', error);
        this.loading = false; // Set loading to false even on error
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
  /* ngOnInit(): void {
    this.loadLoggedInAdmin();
  } */

  /* loadLoggedInAdmin(): void {
    this.adminService.getLoggedInAdmin().subscribe(
      admin => {
        this.loggedInAdmin = admin;
      },
      error => {
        console.error('Error fetching admin details:', error);
        // Handle error appropriately (e.g., show error message)
      }
    );
  } */
 
   
  

