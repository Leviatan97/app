import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/sevices/login.service';
import * as md5 from 'md5';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  alert = false;

  constructor(
    private login: LoginService, 
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      documento: ['', [
        Validators.required,
        Validators.min(10000000),
        Validators.max(9999999999)
      ]],
      contra: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)
      ]]
    });
  }

  async loginUser() {
    await this.login.login(this.form.value.documento.toString(), md5(this.form.value.contra)).subscribe(
      (data) => {
        data.usuario === true ? this.router.navigate(['home']) : this.alert = true;
        this.login.saveDocument(this.form.value.documento.toString());
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
