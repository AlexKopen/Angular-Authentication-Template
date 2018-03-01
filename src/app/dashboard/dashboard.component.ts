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
  private postsSubscription: Subscription;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.postsSubscription = this.dataService.getPosts().subscribe(
      data => this.posts = data
    );
  }

  get displayTable() {
    return this.posts && this.posts.length > 0;
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
