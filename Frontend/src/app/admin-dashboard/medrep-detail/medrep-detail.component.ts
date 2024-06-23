
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-medrep-detail',
  standalone: true,
  imports: [MatIconModule,MatDialogModule,CommonModule],
  templateUrl: './medrep-detail.component.html',
  styleUrl: './medrep-detail.component.css'
})
export class MedrepDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
