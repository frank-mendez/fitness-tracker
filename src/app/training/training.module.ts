import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { CurrentComponent } from './current/current.component';
import { StopTrainingComponent } from './current/stop-training.component';
import { NewComponent } from './new/new.component';
import { PastComponent } from './past/past.component';
import { TrainingComponent } from './training.component';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentComponent,
    NewComponent,
    PastComponent,
    StopTrainingComponent,
  ],
  imports: [MaterialModule, SharedModule],
  exports: [MaterialModule],
})
export class TrainingModule {}
