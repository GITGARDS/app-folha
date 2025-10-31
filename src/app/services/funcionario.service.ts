import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Funcionario, FuncionarioPageable } from "../models/funcionario";
import { GenericHttpService } from "./generic/genericHttpService.service";

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService extends GenericHttpService<Funcionario, FuncionarioPageable> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, environment.url + '/funcionario');
  }
}
