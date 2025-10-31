import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { Funcionario } from "../../../models/funcionario";
import { FuncionarioService } from "../../../services/funcionario.service";

@Component({
  selector: 'app-funcionario2',
  imports: [CommonModule],
  templateUrl: './funcionario2.html',
  styleUrl: './funcionario2.css',
})
export class Funcionario2 implements OnInit {
  readonly funcionarioService = inject(FuncionarioService);

  funcionarios:Funcionario[] = [];

  ngOnInit(): void {
    this.onFindAll();
  }

  onFindAll() {
    this.funcionarioService.findAll().subscribe({
      next: (ret: Funcionario) => {
        this.funcionarios[ret.id] = ret;
      },
    });
  }
}
