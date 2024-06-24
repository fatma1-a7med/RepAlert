import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/user_services/user-services.service'; // Adjust the correct path to your service
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  latestVisits: any[] = [];
  chunkedVisits: any[][] = [];
  activeIndex = 0;

  constructor(private visitService: SalesService) {}

  ngOnInit(): void {
    this.loadLatestVisits();
  }

  loadLatestVisits() {
    this.visitService.getLatestVisits().subscribe(
      (data) => {
        this.latestVisits = data;
        this.chunkedVisits = this.chunkArray(this.latestVisits, 2); // Chunk into groups of 2
        console.log('Latest Visits:', this.latestVisits);
        console.log('Chunked Visits:', this.chunkedVisits);
      },
      (error) => {
        console.error('Error fetching latest visits:', error);
      }
    );
  }

  chunkArray(array: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  next() {
    this.activeIndex = (this.activeIndex + 1) % this.chunkedVisits.length;
  }

  previous() {
    this.activeIndex = (this.activeIndex - 1 + this.chunkedVisits.length) % this.chunkedVisits.length;
  }
}
