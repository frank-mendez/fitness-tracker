import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ExerciseService } from '../training/exercise.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private exerciseService: ExerciseService,
    private snackBar: MatSnackBar,
    private uiService: UIService
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
    this.uiService.loadingStateChanged.next(true);
    this.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log('result', result);
        this.uiService.loadingStateChanged.next(false);
        this.isAuthenticated = true;
      })
      .catch((error) => {
        this.uiService.loadingStateChanged.next(false);
        this.snackBar.open(error.message, null, { duration: 3000 });
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.uiService.loadingStateChanged.next(false);
        this.isAuthenticated = true;
      })
      .catch((error) => {
        this.uiService.loadingStateChanged.next(false);
        this.snackBar.open(error.message, null, { duration: 3000 });
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
