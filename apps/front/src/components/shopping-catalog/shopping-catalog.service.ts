import { Injectable } from "@angular/core";
import { AddToBasketDto, BasketDto, ProductDto, StockProductDto } from "@log/contracts";
import { catchError, map, Observable, of, switchMap, take } from "rxjs";
import { HttpClient } from "@angular/common/http";

export interface ProductWithStockDto extends ProductDto {
  stock: number;
}

@Injectable({
  providedIn: "root"
})
export class ShoppingCatalogService {
  constructor(private httpClient: HttpClient) {
  }

  getAllAvailableProducts(): Observable<ProductWithStockDto[]> {
    return this.httpClient
      .get<ProductDto[]>("/api/referential/products")
      .pipe(switchMap((products) => {
        const productsToReturn: ProductWithStockDto[] = products.map((p) => ({ ...p, stock: 0 }));

        return this.httpClient.get<StockProductDto[]>("/api/stock/stock").pipe(map(stocks => {
          productsToReturn.forEach(p =>
            p.stock = stocks.find((s) => s.productId === p._id)?.quantity || 0
          );
          return productsToReturn;
        }), catchError(() => of(productsToReturn)));
      }));
    /*return forkJoin([
      this.httpClient.get<ProductDto[]>('/api/referential/products'),
      this.httpClient.get<StockProductDto[]>('/api/stock/stock'),
    ]).pipe(
      map(([products, stocks]) =>
        products.map((p) => ({
          ...p,
          stock: stocks.find((s) => s.productId === p._id)?.quantity || 0,
        }))
      )
    );*/
  }

  addToCart(_id?: string): Observable<void> {
    return this.httpClient
      .put<void>("/api/shopping/basket", {
        id: _id,
        quantity: 1
      } as AddToBasketDto)
      .pipe(
        catchError((e) => {
          console.log("error during cart add", e);
          return of();
        })
      );
  }

  getCart(): Observable<BasketDto> {
    return this.httpClient.get<BasketDto>("/api/shopping/basket");
  }

  checkout() {
    this.httpClient
      .post("/api/shopping/basket/checkout", {})
      .pipe(
        take(1),
        catchError((e) => {
          console.log("error during checkout", e);
          return of(null);
        })
      )
      .subscribe((id) => {
        console.log("checkout successful with order id", id);
      });
  }
}
