import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplyRequestFormComponent } from './supply-request-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SupplyRequestFormComponent],
  imports: [CommonModule, FormsModule],
  exports: [SupplyRequestFormComponent],
})
export class SupplyRequestFormModule {}
