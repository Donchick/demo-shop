import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from "../auth.service";
import { UserModel } from '../user.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  login() {
    this.authService.login(new UserModel('donat', 'donat123'))
      .subscribe(() => {
        this.router.navigate(['/product-list']);
      });
  }
}
