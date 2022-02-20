import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

import { Account } from '../../store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup

  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loginForm.updateValueAndValidity()
  }

  handleLogin() {
    console.log("Logging in", this.loginForm.value);
    const payload = {
      email : this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.store.dispatch(new Account.Login(payload))
  }
}
