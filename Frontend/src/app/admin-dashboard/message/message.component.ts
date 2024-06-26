import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit {
  message: string | null = null;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.message$.subscribe(message => {
      this.message = message;
      setTimeout(() => this.message = null, 3000); // Clear message after 3 seconds
    });
  }
}