import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { concatMap, from, map, take } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Empresa, EmpresaPageable } from "../models/empresa";
import { Page } from "../models/page";

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  urlBase = environment.url + '/empresa';

  readonly httpClient = inject(HttpClient);

  create(data: Empresa) {
    console.log('create', data);
    return this.httpClient.post<Empresa>(this.urlBase, data).pipe(take(1));
  }

  editById(data: Empresa) {
    return this.httpClient.put<Empresa>(`${this.urlBase}/${data.id}`, data).pipe(take(1));
  }

  deleteById(id: number) {
    return this.httpClient.delete<String>(`${this.urlBase}/${id}`).pipe(take(1));
  }

  findById(id: string) {
    return this.httpClient.get<Empresa>(`${this.urlBase}/${id}`).pipe(take(1));
  }

  findAll() {
    return this.httpClient.get<Empresa[]>(`${this.urlBase}/findAll`).pipe(
      take(1),
      map((value: Empresa[]) => value),
      map((value: Empresa[]) => {
        return from(value).pipe(
           concatMap((v: Empresa) =>
            this.httpClient.get<Empresa>(`${this.urlBase}/${v.id.toString()}`).pipe(take(1))
          )
        );
      }),
      concatMap((value) => value)
    );
  }

  findAllPg(filter: string, page: Page) {
    return this.httpClient
      .get<EmpresaPageable>(`${this.urlBase}/findAllPg`, {
        params: new HttpParams()
          .set('filter', filter)
          .set('page', page.page)
          .set('size', page.size)
          .set('sort', page.sort),
      })
      .pipe(take(1));
  }
}
