import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    AngularFirestoreModule,
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    AngularFirestoreModule,
  ],
})
export class SharedModule {}
