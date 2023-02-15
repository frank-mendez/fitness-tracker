import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExerciseService } from './exercise.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  exerciseSubscription: Subscription;
  constructor(private exerciseService: ExerciseService) {}

  onGoingTraining = false;

  ngOnInit(): void {
    this.exerciseSubscription = this.exerciseService.changedExercise.subscribe(
      (exercise) => {
        if (exercise) {
          this.onGoingTraining = true;
        } else {
          this.onGoingTraining = false;
        }
      }
    );
  }
}
