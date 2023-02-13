import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  @Output() trainingStart = new EventEmitter();
  exercises: Exercise[] = [];

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.exercises = this.exerciseService.getAvailableExercises();
  }

  onStartTraining() {
    this.trainingStart.emit();
  }
}
