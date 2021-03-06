import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/index';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth/auth.service';
import { Dragon } from '../shared/models/dragon.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  dragons: Dragon[];
  authSubscription: Subscription;
  dragonsSubscription: Subscription;
  displayedColumns: string[] = ['id', 'name', 'source'];

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
