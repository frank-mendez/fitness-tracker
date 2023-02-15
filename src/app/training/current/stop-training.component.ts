import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-traning',
  template: `<div class="dialog-container">
    <h1 mat-dialog-title>Are you sure?</h1>
    <mat-dialog-content>
      <p>You already got {{ data.progress }}%</p>
    </mat-dialog-content>
    <mat-dialog-actions class="actions">
      <button mat-raised-button [mat-dialog-close]="true">Yes</button>
      <button mat-raised-button [mat-dialog-close]="false">No</button>
    </mat-dialog-actions>
  </div>`,
  styleUrls: ['./current.component.scss'],
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
