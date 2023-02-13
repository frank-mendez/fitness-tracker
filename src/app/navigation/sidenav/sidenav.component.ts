import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output() closeSideNav = new EventEmitter();
  isAuth: boolean = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onClose() {
    this.closeSideNav.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
