import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from './../api.service';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  dragons: any[];
  authSubscription: Subscription;
  dragonsSubscription: Subscription;

  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.auth.loggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this._getDragons();
      } else {
        this.dragons = null;
        this._destroyDragonsSubscription();
      }
    });
  }

  get userIsAuthenticated(): boolean {
    return this.auth.authenticated;
  }

  ngOnDestroy() {
    // Unsubscribe from observables
    this.authSubscription.unsubscribe();
    this._destroyDragonsSubscription();
  }

  private _getDragons() {
    // Subscribe to dragons API observable
    this.dragonsSubscription = this.api.getDragons$().subscribe(
      data => {
        this.dragons = data;
      },
      err => console.warn(err),
      () => console.log('Request complete')
    );
  }

  private _destroyDragonsSubscription() {
    // If a dragons subscription exists, unsubscribe
    if (this.dragonsSubscription) {
      this.dragonsSubscription.unsubscribe();
    }
  }

  get dragonsExist() {
    return !!this.dragons && this.dragons.length;
  }
}
