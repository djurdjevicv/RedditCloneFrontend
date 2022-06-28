import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Community } from '../model/community';
import { Post } from '../model/post';
import { User } from '../model/user';
import { CommunityService } from '../services/community/community.service';
import { PostService } from '../services/post/post.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-card-post-community',
  templateUrl: './card-post-community.component.html',
  styleUrls: ['./card-post-community.component.scss']
})
export class CardPostCommunityComponent implements OnInit {

  @Input('communityId') communityId: number = 0;

  postList: Array<Post> = [];

  constructor(private router: Router, private postService: PostService, private userService: UserService,
    private communityService:CommunityService) {


  }

  ngOnInit(): void {
    this.getCommunityPosts();

  }

  private getCommunityPosts(): void {
    this.postService.getCommunityPosts(this.communityId).subscribe(res => {
      this.postList = res;
      console.log(res);
    })

  }




}
