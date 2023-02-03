import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter();
  show = false;

  constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.show = true;
        } else {
          this.show = false;
        }
      });
  }

  onToggleHandler() {
    this.sideNavToggle.emit();
  }
}
