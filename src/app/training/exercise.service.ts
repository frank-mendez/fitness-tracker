import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';

export class ExerciseService {
  changedExercise = new Subject<Exercise>();
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];

  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    const selectedExercise = this.availableExercises.find(
      (exercise) => exercise.id === selectedId
    );

    this.runningExercise = selectedExercise;
    this.changedExercise.next({ ...this.runningExercise });
  }

  completeRunningExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.changedExercise.next(null);
  }

  cancelRunningExercise(progress: number) {
    this.exercises.push({
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
    return this.exercises.slice();
  }
}
