import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  @Output() trainingStart = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onStartTraining() {
    this.trainingStart.emit();
  }
}
