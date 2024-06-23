import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-visit-details-dialog',
  templateUrl: './visit-details-dialog.component.html',
  styleUrls: ['./visit-details-dialog.component.css'],
  encapsulation: ViewEncapsulation.Emulated  // This is the default; you can also try None for global styles
})
export class VisitDetailsDialogComponent {
  constructor(
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<VisitDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
