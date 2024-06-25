import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../user/navbar/navbar.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

}
