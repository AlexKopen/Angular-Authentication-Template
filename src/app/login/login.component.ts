import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  showSpinner = false;
  showError = false;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.logInError$.subscribe(data => this.processLoginError(data));
  }

  login(): void {
    this.showError = false;
    this.showSpinner = true;
    this.auth.login(this.username, this.password);
  }

  processLoginError(errorCaught: boolean): void {
    if (errorCaught) {
      this.showSpinner = false;
      this.showError = true;
    }
  }
}
