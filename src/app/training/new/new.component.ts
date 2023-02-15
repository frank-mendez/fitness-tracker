import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Exercise } from '../exercise.model';
import { map } from 'rxjs/operators';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  exercisesCollection: AngularFirestoreCollection<Exercise>;
  exercises: Observable<Exercise[]>;

  constructor(
    private firestore: AngularFirestore,
    private exerciseService: ExerciseService
  ) {
    this.exercisesCollection =
      this.firestore.collection<Exercise>('availableExercises');
    this.exercises = this.exercisesCollection.snapshotChanges().pipe(
      map((docArray) => {
        return docArray.map((doc) => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data(),
          };
        });
      })
    );
  }

  ngOnInit(): void {}

  onStartTraining(form: NgForm) {
    this.exerciseService.startExercise(form.value.exercise);
  }
}
