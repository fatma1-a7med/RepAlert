import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../../services/reporting.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  specialization?: string;
  phone_number?: string;
  street?: string;
  state?: string;
  city?: string;
}

interface VisitReport {
  visit_date: string;
  visit_time: string;
  location: {
    name: string;
    street: string;
    state: string;
    city: string;
  };
  doctors: User[];
  purpose: string;
}

@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  visitReports: VisitReport[] = [];
  filteredVisitReports: VisitReport[] = [];
  doctors: User[] = [];
  searchUser: string = '';

  constructor(private reportingService: ReportingService) { }

  ngOnInit(): void {
    this.reportingService.getVisitReports().subscribe(data => {
      this.visitReports = data;
      this.filteredVisitReports = [...this.visitReports];
      this.extractDoctors();
    });
  }

  extractDoctors(): void {
    const doctorSet = new Set<User>();
    this.visitReports.forEach(visit => {
      if (visit.doctors) {
        visit.doctors.forEach((doctor: User) => doctorSet.add(doctor));
      }
    });
    this.doctors = Array.from(doctorSet);
  }

  filterByDoctor(doctorId: string): void {
    if (doctorId) {
      this.filteredVisitReports = this.visitReports.filter(visit =>
        visit.doctors.some((doctor: User) => doctor.id.toString() === doctorId)
      );
    } else {
      this.filteredVisitReports = [...this.visitReports];
    }
  }

  applyFilter(): void {
    if (this.searchUser.trim() !== '') {
      this.filteredVisitReports = this.visitReports.filter(visit =>
        visit.doctors.some((doctor: User) =>
          doctor.first_name.toLowerCase().includes(this.searchUser.toLowerCase()) ||
          doctor.last_name.toLowerCase().includes(this.searchUser.toLowerCase())
        )
      );
    } else {
      this.filteredVisitReports = [...this.visitReports];
    }
  }

  generatePDF(): void {
    const element = document.getElementById('visit-report-content');
    if (element) {
      html2canvas(element, { scale: 3 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const pdf = new jsPDF('p', 'pt', [imgWidth, imgHeight]);
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('visit-report.pdf');
      }).catch(error => {
        console.error('Error generating PDF:', error);
      });
    } else {
      console.error('Element not found!');
    }
  }
}
