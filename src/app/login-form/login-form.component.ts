import { Component, OnInit } from '@angular/core';
import { Login } from '../shared/models/login.model';
import { AuthService } from '../shared/auth.service';
import * as auth0 from 'auth0-js';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginModel = new Login('', '');

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.loginModel.username, this.loginModel.password);
  }
}
