import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Funcionario, FuncionarioPageable } from "../models/funcionario";
import { Page } from "../models/page";

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  urlBase = environment.url + '/funcionario';

  readonly httpClient = inject(HttpClient);

  create(data: Funcionario) {
    return this.httpClient.post<Funcionario>(this.urlBase, data);
  }

  editById(data: Funcionario) {
    return this.httpClient.put<Funcionario>(`${this.urlBase}/${data.id}`, data);
  }

  deleteById(id: number) {
    return this.httpClient.delete<Funcionario>(`${this.urlBase}/${id}`);
  }

  findById(id: number) {
    return this.httpClient.get<Funcionario>(`${this.urlBase}/${id}`);
  }

  findAll(filter: string, page: Page) {
    return this.httpClient.get<FuncionarioPageable>(this.urlBase, {
      params: new HttpParams()
        .set('filter', filter)
        .set('page', page.page)
        .set('size', page.size)
        .set('sort', page.sort),
    });
  }
}
