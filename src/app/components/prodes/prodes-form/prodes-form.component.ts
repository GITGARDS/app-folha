import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { Prodes } from "../../../models/prodes";

@Component({
  selector: 'app-prodes-form',
  templateUrl: './prodes-form.component.html',
  styleUrl: './prodes-form.component.css',
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogClose,
  ],
})
export class ProdesFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  form = this.fb.group({
    id: [0],
    codigo: [0, Validators.required],
    descricao: ['', Validators.required],
    tipo: ['P', Validators.required],
    automatico: [false, Validators.required],
    tipoValor: [''],
    valor: [0],
    incidencia: [''],
    ativo: [true, Validators.required],
  });

  readonly dialogRef = inject(MatDialogRef<ProdesFormComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    if (this.data.opcao === 'editar') {
      const data: Prodes = {
        id: this.data.data.id,
        codigo: this.data.data.codigo,
        descricao: this.data.data.descricao,
        tipo: this.data.data.tipo,
        automatico: this.data.data.automatico,
        tipoValor: this.data.data.tipoValor,
        valor: this.data.data.valor,
        incidencia: this.data.data.incidencia,
        ativo: this.data.data.ativo,
      };
      this.form.setValue(data);
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  okClick() {
    const data: Prodes = {
      id: this.form.value.id!,
      codigo: this.form.value.codigo!,
      descricao: this.form.value.descricao!,
      tipo: this.form.value.tipo!,
      automatico: this.form.value.automatico!,
      tipoValor: this.form.value.tipoValor!,
      valor: this.form.value.valor!,
      incidencia: this.form.value.incidencia!,
      ativo: this.form.value.ativo!,
    };
    this.dialogRef.close(data);
  }
}
