import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth-config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: 'token id_token',
    redirectUri: AUTH_CONFIG.REDIRECT,
    audience: AUTH_CONFIG.AUDIENCE,
    scope: AUTH_CONFIG.SCOPE
  });
  userProfile: any;

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  refreshSubscription: any;

  constructor(private router: Router) {
    // If authenticated, set local profile property and update login status subject
    // If token is expired, log out to clear any data from localStorage
    if (this.authenticated) {
      this.userProfile = JSON.parse(localStorage.getItem('profile'));
      this.setLoggedIn(true);
    } else {
      this.logout();
    }
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login(username: string, password: string) {
    // Auth0 authorize request
    this.auth0.login({
      realm: 'Username-Password-Authentication',
      username: username,
      password: password,
    }, (err) => {
      this.setLoggedIn(false);
    });
  }

  handleAuth() {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash(window.location.hash, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this._getProfile(authResult);
      } else if (err) {
        console.error(`Error: ${err.error}`);
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      this._setSession(authResult, profile);
    });
  }

  private _setSession(authResult, profile?) {
    const expTime = authResult.expiresIn * 1000 + Date.now();
    // Save session data and update login status subject
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expTime));
    if (profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
      this.userProfile = profile;
    }
    this.setLoggedIn(true);
    this.scheduleRenewal();
    this.router.navigate(['/dashboard']);
  }

  logout() {
    // Remove tokens and profile and update login status subject
    localStorage.removeItem('token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    this.userProfile = undefined;
    this.unscheduleRenewal();
    this.setLoggedIn(false);
  }

  get authenticated(): boolean {
    // Check if current date is greater than expiration
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

  public scheduleRenewal() {
    if (!this.authenticated) {
      return;
    }

    this.unscheduleRenewal();

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

    const source = Observable.of(expiresAt).flatMap(
      expiresAt => {

        const now = Date.now();

        // Use the delay in a timer to
        // run the refresh at the proper time
        return Observable.timer(Math.max(1, expiresAt - now));
      });

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = source.subscribe(() => {
      this.renewToken();
      this.scheduleRenewal();
    });
  }

  public unscheduleRenewal() {
    if (!this.refreshSubscription) {
      return;
    }
    this.refreshSubscription.unsubscribe();
  }

  public renewToken() {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        this._setSession(result);
      }
    });
  }

}
