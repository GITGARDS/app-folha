import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs";
import { Funcionario } from "../../../models/funcionario";
import { FuncionarioService } from "../../../services/funcionario.service";

/**
 * Data source for the FuncionarioFindall view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class FuncionarioFindallDataSource implements DataSource<Funcionario> {
  private funcionarioSubject = new BehaviorSubject<Funcionario[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();

  constructor(private fucionarioService: FuncionarioService) {}

  connect(collectionViewer: CollectionViewer) {
    return this.funcionarioSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.funcionarioSubject.complete();
    this.loadingSubject.complete();
  }

  loadFuncionarios(filter: string, page: number, size: number, sort: string) {
    this.loadingSubject.next(true);

    this.fucionarioService.findByNomeContaining(filter, page, size, sort).subscribe({
      next: (pageable) => {
        this.funcionarioSubject.next(pageable.content);
        this.loadingSubject.next(false);
      },
      error: () => {
        this.funcionarioSubject.next([]);
        this.loadingSubject.next(false);
      },
    });
  }
}
