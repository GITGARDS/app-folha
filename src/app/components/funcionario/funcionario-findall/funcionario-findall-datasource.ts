import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, map } from "rxjs";
import { Funcionario, FuncionarioPageable, FuncionarioPageableInit } from "../../../models/funcionario";
import { Page } from "../../../models/page";
import { FuncionarioService } from "../../../services/funcionario.service";

/**
 * Data source for the FuncionarioFindall view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class FuncionarioFindallDataSource implements DataSource<Funcionario> {
  private funcionarioSubject = new BehaviorSubject<FuncionarioPageable>(FuncionarioPageableInit);

  getFuncionarioSubject() {
    return this.funcionarioSubject.asObservable();
  }

  setFuncionarioSubject(value: FuncionarioPageable) {
    this.funcionarioSubject.next(value);
  }

  constructor(private fucionarioService: FuncionarioService) {}

  connect(collectionViewer: CollectionViewer): Observable<readonly Funcionario[]> {
    return this.getFuncionarioSubject().pipe(
      map((ret: FuncionarioPageable) => {
        return ret.content;
      })
    );
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.funcionarioSubject.complete();
  }

  loadFuncionarios(filter: string, page: Page) {
    this.fucionarioService.findAll(filter, page).subscribe({
      next: (pageable) => {
        this.setFuncionarioSubject(pageable);
      },
      error: () => {
        this.setFuncionarioSubject(FuncionarioPageableInit);
      },
    });
  }
}
