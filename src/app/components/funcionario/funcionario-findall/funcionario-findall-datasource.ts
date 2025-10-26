import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, map } from "rxjs";
import { Funcionario, FuncionarioPageable, FuncionarioPageableInit } from "../../../models/funcionario";
import { FuncionarioService } from "../../../services/funcionario.service";

/**
 * Data source for the FuncionarioFindall view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class FuncionarioFindallDataSource implements DataSource<Funcionario> {
  private funcionarioSubject = new BehaviorSubject<FuncionarioPageable>(FuncionarioPageableInit);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  funcionarioSubject$ = this.funcionarioSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  constructor(private fucionarioService: FuncionarioService) {}

  connect(collectionViewer: CollectionViewer): Observable<readonly Funcionario[]> {
    return this.funcionarioSubject$.pipe(
      map((ret: FuncionarioPageable) => {
        return ret.content;
      })
    );
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.funcionarioSubject.complete();
    this.loadingSubject.complete();
  }

  loadFuncionarios(filter: string, page: number, size: number, sort: string) {
    this.loadingSubject.next(true);

    this.fucionarioService.findByNomeContaining(filter, page, size, sort).subscribe({
      next: (pageable) => {
        console.log('pageable', pageable);
        this.funcionarioSubject.next(pageable);
        this.loadingSubject.next(false);
      },
      error: () => {
        this.funcionarioSubject.next(FuncionarioPageableInit);
        this.loadingSubject.next(false);
      },
    });
  }
}
