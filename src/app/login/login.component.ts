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

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  login(): void {
    this.showSpinner = true;
    this.auth.login(this.username, this.password);
  }
}
