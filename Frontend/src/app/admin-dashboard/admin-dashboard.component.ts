import { Component } from '@angular/core';

import { RouterOutlet,RouterLink } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http'; 
import {ListallmedrepComponent} from './listallmedrep/listallmedrep.component';
import { MatDialog } from '@angular/material/dialog';
import { AddeditComponent } from './addedit/addedit.component';
import { VisitManagementComponent } from './visit-managment/visit-managment.component';
import { CommonModule, DatePipe } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,HttpClientModule,ListallmedrepComponent,RouterLink, VisitManagementComponent, CommonModule, DatePipe,SideBarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private _dialog : MatDialog){}

  openaddeditform(){
   const dialogtref =this._dialog.open(AddeditComponent);
   dialogtref.afterClosed().subscribe({
    next: (val) =>{
      if (val) {
        
      }
    },
   });
  }

}
