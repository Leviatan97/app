import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from 'src/app/sevices/accounts.service';
import { LoginService } from 'src/app/sevices/login.service';
import { OperationsService } from 'src/app/sevices/operations.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  public cuentasPorBanco: any;
  @Input() tipoOperacion!: string;
  @Output()
  otraOperacion: EventEmitter<boolean> = new EventEmitter<boolean>();
  form!: FormGroup;
  cuenta = true;
  retiro = false;
  otraCuenta = false;
  Cuenta1: any;
  operacionConrrecta = false;

  constructor(
    private cuentas: AccountsService,
    private login: LoginService,
    private formBuilder: FormBuilder,
    private operation: OperationsService
  ) { }

  ngOnInit(): void {
    this.login.getDocument() !== null ? this.traerCuentas(this.login.getDocument()) : null;
    console.log();
  }

  async traerCuentas(documento: string): Promise<void> {
    await this.cuentas.cuentas(documento).subscribe(
      (data) => {
        this.cuentasPorBanco = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  operacion(cuenta: any): void {
    this.Cuenta1 = cuenta;
    this.form = this.formBuilder.group({
      valor: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(cuenta.cnt_saldo)
      ]],
    });
    this.retiro = true;
    this.cuenta = false;
  }

  continuar(): void {
    if (this.tipoOperacion === 'Retiros') {
      this.retirar();
    }else {
      this.retiro = false;
      this.otraCuenta = true;
    }
  }

  async retirar(): Promise<void> {
    await this.operation.retirar(this.Cuenta1.cnt_numero, this.form.value.valor).subscribe(
      (data) => {
        console.log(data);
        data.cuenta === true ? this.operacionConrrecta = true : null;
        this.retiro = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async transferir(cuenta: any): Promise<void> {
    await this.operation.transferir(this.Cuenta1.cnt_numero, cuenta.cnt_numero, this.form.value.valor).subscribe(
      (data) => {
        console.log(data);
        data.cuenta === true ? this.operacionConrrecta = true : null;
        this.otraCuenta = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  otraOperaciones(): void {
    this.otraOperacion.emit(true);
  }

}
