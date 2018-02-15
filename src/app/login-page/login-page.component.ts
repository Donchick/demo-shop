import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from "../auth.service";
import { UserModel } from '../user.model';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Observable} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['../../assets/styles/reset_css.css', './login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  globalError: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      login: ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z]{3,}$/)])],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loginForm.valueChanges.subscribe(() => {
      this.globalError = null;
    });
  }

  login(loginForm: any) {
    if (!this.loginForm.valid) {
      return;
    }

    let userModel = new UserModel(loginForm.login, loginForm.password);
    this.authService.login(userModel)
      .catch((err: any) => {
        if (err.status === 400) {
          this.globalError = 'Wrong login or password';
          return Observable.empty();
        }

        return Observable.throw(err);
      })
      .subscribe(() => {
        this.router.navigate(['/main-layout']);
      });
  }
}
