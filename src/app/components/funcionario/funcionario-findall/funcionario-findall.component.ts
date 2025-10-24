import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTable, MatTableModule } from "@angular/material/table";
import { Funcionario } from "../../../models/funcionario";
import { FuncionarioFindallDataSource } from "./funcionario-findall-datasource";

@Component({
  selector: 'app-funcionario-findall',
  templateUrl: './funcionario-findall.component.html',
  styleUrl: './funcionario-findall.component.css',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule]
})
export class FuncionarioFindallComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Funcionario>;
  dataSource = new FuncionarioFindallDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nome', 'cargo', 'salarioBase', 'acoes'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
