import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subject = new Subject<string>();
  message$ = this.subject.asObservable();

  showMessage(message: string) {
    this.subject.next(message);
  }
}
