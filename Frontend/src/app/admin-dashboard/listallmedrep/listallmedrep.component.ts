import { MedicalrepService } from '../../services/medicalrep.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog'
import { AddeditComponent } from '../addedit/addedit.component';
import { MedrepDetailComponent } from '../medrep-detail/medrep-detail.component';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-listallmedrep',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MedrepDetailComponent

  ],
  templateUrl: './listallmedrep.component.html',
  styleUrls: ['./listallmedrep.component.css']
})
export class ListallmedrepComponent implements OnInit, AfterViewInit {
  userId: number | null = null;


onShow(data: any) {
console.log(data)
}

  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'phone_number','actions' ];
  dataSource!: MatTableDataSource<any> ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _medrepservice: MedicalrepService,private _dialog : MatDialog,private authService: AuthService) {}

  ngOnInit(): void {
    this.getMedreplist();
    console.log('id',this.userId = this.authService.getUserId());
  }
  ngAfterViewInit(): void {
  
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }
  }

  openaddeditform() {
    const dialogRef = this._dialog.open(AddeditComponent);
    dialogRef.afterClosed().subscribe({
        next: (val) => {
            if (val) {
                this.getMedreplist(); 
            }
        },
    });
}
  getMedreplist(): void {
    this._medrepservice.getMedreplist().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletemedrip(id: number) {
    if (confirm('Are you sure you want to delete this Medrep?')) {
      this._medrepservice.deletemedrip(id).subscribe({
        next: (res) => {
          alert('Medrep deleted successfully');
          this.getMedreplist();
        },
        error: console.log,
      });
    }
  }


openeditform(data:any) {
  const dialogRef=this._dialog.open(AddeditComponent, {
    data,
  });
  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val) {
        this.getMedreplist();
      }
    },
  });
 
}
show(data: any) {
  this._dialog.open(MedrepDetailComponent, {
    data,
    width: '400px'  // Adjust width as needed
  });
}
}