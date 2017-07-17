import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from "../auth.service";
import { UserModel } from '../user.model';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      login: [''],
      password: ['']
    });
  }

  ngOnInit() {
  }

  login(loginForm: any) {
    let userModel = new UserModel(loginForm.login, loginForm.password);
    this.authService.login(userModel)
      .subscribe(() => {
        this.router.navigate(['/product-list']);
      });
  }
}
