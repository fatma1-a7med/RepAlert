import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { SalesService } from '../../services/user_services/user-services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-latest-visits',
  standalone:true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['visit_date', 'visit_time', 'status', 'doctor_name', 'specialization', 'class_rate', 'tools'];
  dataSource: MatTableDataSource<any>;
  visits: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: SalesService) {
    this.dataSource = new MatTableDataSource<any>(); 
  }

  ngOnInit(): void {
    this.fetchVisits();
  }

  fetchVisits() {
    this.userService.getLatestVisits().subscribe(
      (response: any[]) => {
        this.visits = response.map(visit => ({
          ...visit,
          doctor_name: visit.doctor.doctor_name,
          specialization: visit.doctor.specialization,
          class_rate: visit.doctor.class_rate
        }));
        this.dataSource.data = this.visits; 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Error fetching visits:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (filterValue.length === 0) {
      // If the filter is empty, reset the filtered data to original data
      this.dataSource.data = this.visits;
    } else {
      // Filter the data
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const doctorName = data.doctor_name.toLowerCase();
        return doctorName.includes(filter);
      };
      this.dataSource.filter = filterValue;
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}