import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();

  constructor(private router: Router, private auth: AngularFireAuth) {}

  private user: User | null = null;

  registerUser(authData: AuthData) {
    this.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log('result', result);

        this.authSuccessful();
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  login(authData: AuthData) {
    this.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log('result', result);

        this.authSuccessful();
      })
      .catch((error) => {
        console.log('error', error);
      });
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
