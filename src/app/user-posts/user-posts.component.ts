import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../model/post';
import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication-service.service';
import { PostService } from '../services/post/post.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {

  postList: Array<Post> = [];
  logUser: User;


  constructor(private router: Router, private postService: PostService, private userService: UserService,
    private authService:AuthenticationService ) {

      this.logUser = authService.getCurrentUser()
  }

  ngOnInit(): void {

    this.getAllPosts();

  }

  private getAllPosts(): void {
    this.postService.getOneUserPosts(this.logUser.username).subscribe(res => {
      this.postList = res;
      console.log(res);
    })

  }

  public changed(event: any): void {
    this.getAllPosts();
  }

}
