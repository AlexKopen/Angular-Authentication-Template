import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit, OnDestroy {
  loggedInSub: Subscription;

  constructor(private auth: AuthService, private router: Router) {
    // Parse authentication hash
    auth.handleLoginCallback();
  }

  ngOnInit() {
    this.loggedInSub = this.auth.loggedIn$.subscribe(
      loggedIn => (loggedIn ? this.router.navigate(['/dashboard']) : null)
    );
  }

  ngOnDestroy() {
    this.loggedInSub.unsubscribe();
  }
}
