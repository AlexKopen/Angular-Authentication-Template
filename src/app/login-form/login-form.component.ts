import { Component, OnDestroy, OnInit } from '@angular/core';
import { Login } from '../shared/models/login.model';
import { AuthService } from '../shared/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  loginModel = new Login('', '');
  loginStateSubscription: Subscription;
  private loginUnsuccessful = false;
  private formSubmitted = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.loginStateSubscription = this.authService.loggedIn$.subscribe(value => {
      this.loginUnsuccessful = !value;
    });
  }

  get displayErrorMessage() {
    return this.formSubmitted && this.loginUnsuccessful;
  }

  onSubmit() {
    this.loginUnsuccessful = false;
    this.formSubmitted = true;
    this.authService.login(this.loginModel.username, this.loginModel.password);
  }

  ngOnDestroy() {
    this.loginStateSubscription.unsubscribe();
  }
}
