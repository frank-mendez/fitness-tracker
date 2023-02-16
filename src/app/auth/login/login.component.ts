import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading: boolean = false;

  private loadingSubscription: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.required],
      }),
    });
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (loading) => {
        this.isLoading = loading;
      }
    );
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe;
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
  }
}
