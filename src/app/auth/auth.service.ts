import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ExerciseService } from '../training/exercise.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private exerciseService: ExerciseService
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.authChange.next(false);
        this.isAuthenticated = false;
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log('result', result);
        this.isAuthenticated = true;
      })
      .catch((error) => {
        this.isAuthenticated = false;
        console.log('error', error);
      });
  }

  login(authData: AuthData) {
    this.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log('result', result);
        this.isAuthenticated = true;
      })
      .catch((error) => {
        console.log('error', error);
        this.isAuthenticated = false;
      });
  }

  logout() {
    this.exerciseService.cancelExercisesSubscriptions();
    this.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
