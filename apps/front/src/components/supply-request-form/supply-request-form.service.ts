import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SupplyInputDto } from "@log/contracts";
import { catchError, of, take } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SupplyRequestFormService {
  constructor(private httpClient: HttpClient) {}

  send(toSend: SupplyInputDto) {
    this.httpClient
      .post('/api/supply/supply', toSend)
      .pipe(
        take(1),
        catchError((e) => {
          console.log('Supply request failed: ', e);
          return of(null);
        })
      )
      .subscribe(() => {
        console.log('Successfully requested supply');
      });
  }
}
