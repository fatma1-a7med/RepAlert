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

interface Location {
  name: string;
  street: string;
  state: string;
  city: string;
}

interface VisitReport {
  visit_date: string;
  visit_time: string;
  location: Location;
  doctors: User[];
  purpose: string;
  user: User; // Add user to the interface
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
  users: User[] = [];
  selectedUserId: string = ''; 
  

  constructor(private reportingService: ReportingService) { }

  ngOnInit(): void {
    this.reportingService.getVisitReports().subscribe(data => {
      this.visitReports = data;
      this.filteredVisitReports = [...this.visitReports];
      this.extractUsers();
    });
  }

  extractUsers(): void {
    const userMap = new Map<string, User>();
    this.visitReports.forEach(visit => {
      if (visit.user) {
        const userKey = `${visit.user.first_name.toLowerCase()}_${visit.user.last_name.toLowerCase()}`;
        if (!userMap.has(userKey)) {
          userMap.set(userKey, visit.user);
        }
      }
    });
    this.users = Array.from(userMap.values());
    console.log('Unique users extracted:', this.users);
  }

  filterByUser(userId: string): void {
    if (userId) {
      this.filteredVisitReports = this.visitReports.filter(visit =>
        visit.user.id.toString() === userId
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
        const imgWidth = 595.28; // A4 size width in points
        const pageHeight = 841.89; // A4 size height in points
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
  
        const pdf = new jsPDF('p', 'pt', 'a4');
        let position = 0;
  
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
  
        pdf.save('visit-report.pdf');
      }).catch(error => {
        console.error('Error generating PDF:', error);
      });
    } else {
      console.error('Element not found!');
    }
  }
}
