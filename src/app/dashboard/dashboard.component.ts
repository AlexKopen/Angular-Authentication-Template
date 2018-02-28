import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Post } from '../shared/models/post.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  posts: Array<Post>;
  postsSubscription: Subscription;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.postsSubscription = this.dataService.getPosts().subscribe(
      data => this.posts = data
    );
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
