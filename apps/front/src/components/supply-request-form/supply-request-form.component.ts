import { Component } from '@angular/core';
import { SupplyProductDto } from '@log/contracts';
import { SupplyRequestFormService } from './supply-request-form.service';

@Component({
  selector: 'log-supply-request-form',
  templateUrl: './supply-request-form.component.html',
  styleUrls: ['./supply-request-form.component.scss'],
})
export class SupplyRequestFormComponent {
  newItem: SupplyProductDto = {} as SupplyProductDto;
  allItems: SupplyProductDto[] = [];

  constructor(private supplyService: SupplyRequestFormService) {}

  sendToSupply() {
    this.supplyService.send({ supplyId: 'whatever', products: this.allItems });
    this.allItems = [];
  }

  addNewItem() {
    this.allItems.push(this.newItem);
    this.newItem = {} as SupplyProductDto;
  }
}
