import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCatalogComponent } from './shopping-catalog.component';

@NgModule({
  declarations: [ShoppingCatalogComponent],
  exports: [ShoppingCatalogComponent],
  imports: [CommonModule],
})
export class ShoppingCatalogModule {}
