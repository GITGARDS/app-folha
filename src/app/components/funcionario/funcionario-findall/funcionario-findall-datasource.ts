import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Observable, merge, of as observableOf } from "rxjs";
import { map } from "rxjs/operators";
import { Funcionario } from "../../../models/funcionario";

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Funcionario[] = [
  { id: 1, nome: 'João Silva', cargo: 'Desenvolvedor', salarioBase: 5000 },
  { id: 2, nome: 'Maria Souza', cargo: 'Analista de Sistemas', salarioBase: 6000 },
  { id: 3, nome: 'Carlos Pereira', cargo: 'Gerente de Projetos', salarioBase: 8000 },
  { id: 4, nome: 'Ana Costa', cargo: 'Designer UX', salarioBase: 4500 },
  { id: 5, nome: 'Pedro Oliveira', cargo: 'DevOps Engineer', salarioBase: 7000 },
  { id: 6, nome: 'Luiza Fernandes', cargo: 'QA Engineer', salarioBase: 4000 },
  { id: 7, nome: 'Rafael Lima', cargo: 'Product Owner', salarioBase: 9000 },
  { id: 8, nome: 'Beatriz Almeida', cargo: 'Scrum Master', salarioBase: 7500 },
  { id: 9, nome: 'Felipe Gomes', cargo: 'Backend Developer', salarioBase: 5500 },
  { id: 10, nome: 'Carla Ribeiro', cargo: 'Frontend Developer', salarioBase: 5200 },
];

/**
 * Data source for the FuncionarioFindall view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class FuncionarioFindallDataSource extends DataSource<Funcionario> {
  data: Funcionario[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Funcionario[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Funcionario[]): Funcionario[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Funcionario[]): Funcionario[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name':
          return compare(a.nome, b.nome, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
