import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiCheckComponent } from './api-check.component';

@NgModule({
  declarations: [ApiCheckComponent],
  exports: [ApiCheckComponent],
  imports: [CommonModule],
})
export class ApiCheckModule {}
