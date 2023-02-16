import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { Exercise } from './exercise.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ExerciseService {
  changedExercise = new Subject<Exercise>();
  changedExercises = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  exercisesCollection: AngularFirestoreCollection<Exercise>;
  exercises: Observable<Exercise[]>;

  constructor(private firestore: AngularFirestore) {
    this.exercisesCollection =
      this.firestore.collection<Exercise>('availableExercises');
  }

  fetchAvailableExercises() {
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

    this.exercises.subscribe((exercises) => {
      this.availableExercises = exercises;
      this.changedExercises.next([...this.availableExercises]);
    });
  }

  startExercise(selectedId: string) {
    const selectedExercise = this.availableExercises.find(
      (exercise) => exercise.id === selectedId
    );

    this.runningExercise = selectedExercise;
    this.changedExercise.next({ ...this.runningExercise });
  }

  completeRunningExercise() {
    this.addDataToDb({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.changedExercise.next(null);
  }

  cancelRunningExercise(progress: number) {
    this.addDataToDb({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = null;
    this.changedExercise.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getAllExercises() {
    return [];
  }

  private addDataToDb(exercise: Exercise) {
    this.firestore.collection('finishedExercises').add(exercise);
  }
}
