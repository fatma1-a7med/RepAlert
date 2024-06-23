import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  private iss = {
    login: 'http://localhost:8000/api/admin/login',
    register: 'http://localhost:8000/api/admin/register'
  };

  handle(token: string) {
    this.set(token);
  }

  set(token: string) {
    localStorage!.setItem('token', token);
  }

  get() {
    return localStorage!.getItem('token');
  }

  remove() {
    localStorage!.removeItem('token');
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token: string) {
    try {
      const payload = token.split('.')[1];
      return this.decode(payload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  decode(payload: string) {
    try {
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Error decoding token payload:', error);
      return null;
    }
  }

  loggedIn() {
    return this.isValid();
  }
}
