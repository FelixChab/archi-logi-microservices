import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCheckService {
  apis = [
    { name: 'referential', status: Status.Unknown },
    { name: 'shopping', status: Status.Unknown },
    { name: 'supply', status: Status.Unknown },
    { name: 'order', status: Status.Unknown },
    { name: 'stock', status: Status.Unknown },
    { name: 'delivery', status: Status.Unknown },
  ];

  constructor(private httpClient: HttpClient) {}

  getApiStatuses(): Observable<ApiStatus[]> {
    const requests: Observable<ApiStatus>[] = this.apis.map((api) =>
      this.httpClient.get(`/api/${api.name}/ping`).pipe(
        map(() => ({ ...api, status: Status.Online })),
        catchError((e) => {
          console.log(e);
          return of({
            ...api,
            status: e.status === 200 ? Status.Online : Status.Offline,
          });
        })
      )
    );

    return forkJoin(requests).pipe(take(1));
  }
}

export interface ApiStatus {
  name: string;
  status: Status;
}

enum Status {
  Unknown = 'Unknown',
  Online = 'Online',
  Offline = 'Offline',
}
