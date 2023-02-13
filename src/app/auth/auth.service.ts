import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();

  constructor(private router: Router) {}

  private user: User | null = null;

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: uuid(),
    };

    this.authSuccessful();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: uuid(),
    };

    this.authSuccessful();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user !== null;
  }

  authSuccessful() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
