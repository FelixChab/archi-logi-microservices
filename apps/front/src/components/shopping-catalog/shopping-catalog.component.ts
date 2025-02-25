import { Component } from "@angular/core";
import { BasketDto } from "@log/contracts";
import { Observable, of, take } from "rxjs";
import { ProductWithStockDto, ShoppingCatalogService } from "./shopping-catalog.service";

@Component({
  selector: 'log-shopping-catalog',
  templateUrl:  './shopping-catalog.component.html',
  styleUrls: ['./shopping-catalog.component.scss'],
})
export class ShoppingCatalogComponent {
  products: Observable<ProductWithStockDto[]>;
  shoppingCart: Observable<BasketDto> = of({} as BasketDto);

  constructor(private service: ShoppingCatalogService) {
    this.products = this.service.getAllAvailableProducts();
    this.refreshCart();
  }

  addToCart(_id?: string) {
    this.service
      .addToCart(_id)
      .pipe(take(1))
      .subscribe(() => {
        console.log('item added to cart');
        this.refreshCart();
      });
  }

  private refreshCart() {
    this.shoppingCart = this.service.getCart();
  }

  checkout() {
    this.service.checkout();
  }
}
