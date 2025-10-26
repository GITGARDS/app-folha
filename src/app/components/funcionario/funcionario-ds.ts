import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, map } from "rxjs";
import { Funcionario, FuncionarioPageable, FuncionarioPageableInit } from "../../models/funcionario";

export class FuncionarioDs implements DataSource<Funcionario> {
  private funcionarioSubject = new BehaviorSubject<FuncionarioPageable>(FuncionarioPageableInit);
  funcionarioSubject$ = this.funcionarioSubject.asObservable();

  connect(collectionViewer: CollectionViewer): Observable<readonly Funcionario[]> {
    const result = this.funcionarioSubject$.pipe(
      map((ret) => ret.content)
    );
    return result;
  }
  disconnect(collectionViewer: CollectionViewer): void {
    throw new Error('Method not implemented.');
  }
}
