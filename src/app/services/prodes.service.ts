import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { concatMap, from, map, take } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Page } from "../models/page";
import { Prodes, ProdesPageable } from "../models/prodes";

@Injectable({
  providedIn: 'root',
})
export class ProdesService {
  urlBase = environment.url + '/prodes';

  readonly httpClient = inject(HttpClient);

  create(data: Prodes) {
    console.log('create', data);
    return this.httpClient.post<Prodes>(this.urlBase, data).pipe(take(1));
  }

  editById(data: Prodes) {
    return this.httpClient.put<Prodes>(`${this.urlBase}/${data.id}`, data).pipe(take(1));
  }

  deleteById(id: number) {
    return this.httpClient.delete<String>(`${this.urlBase}/${id}`).pipe(take(1));
  }

  findById(id: string) {
    return this.httpClient.get<Prodes>(`${this.urlBase}/${id}`).pipe(take(1));
  }

  findAll() {
    return this.httpClient.get<Prodes[]>(`${this.urlBase}/findAll`).pipe(
      take(1),
      map((value: Prodes[]) => value),
      map((value: Prodes[]) => {
        return from(value).pipe(
           concatMap((v: Prodes) =>
            this.httpClient.get<Prodes>(`${this.urlBase}/${v.id.toString()}`).pipe(take(1))
          )
        );
      }),
      concatMap((value) => value)
    );
  }

  findAllPg(filter: string, page: Page) {
    return this.httpClient
      .get<ProdesPageable>(`${this.urlBase}/findAllPg`, {
        params: new HttpParams()
          .set('filter', filter)
          .set('page', page.page)
          .set('size', page.size)
          .set('sort', page.sort),
      })
      .pipe(take(1));
  }
}
