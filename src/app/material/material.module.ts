import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatProgressSpinnerModule, MatButtonModule],
  exports: [MatFormFieldModule, MatInputModule, MatCardModule, MatProgressSpinnerModule, MatButtonModule],
  declarations: []
})
export class MaterialModule {}
