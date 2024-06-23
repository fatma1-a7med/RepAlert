import { Component } from '@angular/core';
import { UserLoginComponent } from './user-login/user-login.component';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [UserLoginComponent],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {

}
