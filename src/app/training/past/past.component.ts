import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.scss'],
})
export class PastComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.dataSource.data = this.exerciseService.getAllExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  hanldeFilter(event: Event) {
    const { target } = event;
    const value = (target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
