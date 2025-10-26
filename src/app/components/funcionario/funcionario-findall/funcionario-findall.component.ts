import { JsonPipe } from "@angular/common";
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator, MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { debounceTime, distinctUntilChanged, fromEvent, merge, tap } from "rxjs";
import { FuncionarioService } from "../../../services/funcionario.service";
import { FuncionarioFindallDataSource } from "./funcionario-findall-datasource";

@Component({
  selector: 'app-funcionario-findall',
  templateUrl: './funcionario-findall.component.html',
  styleUrl: './funcionario-findall.component.css',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    JsonPipe,
    MatSlideToggleModule,
    FormsModule,
  ],
})
export class FuncionarioFindallComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: ElementRef;
  dataSource!: FuncionarioFindallDataSource;

  displayedColumns = ['id', 'nome', 'cargo', 'salarioBase', 'acoes'];

  funcionarioService = inject(FuncionarioService);

  // paginator inicio

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 15];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  // paginator fim

  ngOnInit(): void {
    this.dataSource = new FuncionarioFindallDataSource(this.funcionarioService);
    this.dataSource.loadFuncionarios('', 0, 5, 'nome');
    
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadFuncionarioPage();
        })
      )
      .subscribe({
        next: (ret) => {
          console.log('fromEvent', ret);
        },
      });

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadFuncionarioPage()))
      .subscribe({
        next: (ret) => {
          console.log('merge', ret);
        },
      });
      
  }

  loadFuncionarioPage() {
    this.dataSource.funcionarioSubject$.subscribe({
      next: (ret) => {
        console.log('loadFuncionarioPage', ret);
      },
    });

    this.dataSource.loadFuncionarios(
      this.input.nativeElement.value,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      'id'
    );
  }

  handlePageEvent(e: PageEvent) {
    console.log('handlePageEvent', e);
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map((str) => +str);
    }
  }
}
