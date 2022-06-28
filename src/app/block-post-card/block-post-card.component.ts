import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Community } from '../model/community';
import { Roles } from '../model/enums/roles';
import { Post } from '../model/post';
import { ReportPost } from '../model/reportPost';
import { User } from '../model/user';
import { CommunityService } from '../services/community/community.service';
import { PostService } from '../services/post/post.service';
import { ReportPostService } from '../services/report/reportPost.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-block-post-card',
  templateUrl: './block-post-card.component.html',
  styleUrls: ['./block-post-card.component.scss']
})
export class BlockPostCardComponent implements OnInit {

  @Input() reportPost: ReportPost;
  @Output('changed') changed = new EventEmitter<boolean>();

  post:Post = {
    postId: 0,
    title: '',
    text: '',
    creationDate: '',
    imagePath: '',
    community: 0,
    user: 0,
    flair: 0
  }

  user: User = {
    userId: 0,
    username: '',
    password: '',
    email: '',
    avatar: '',
    registrationDate: '',
    description: '',
    displayName: '',
    roles: Roles.USER
  }

  community:Community = {
    communityId: 0,
    name: '',
    description: '',
    creationDate: null,
    moderator: 0
  }

  reportBy:User = {
    userId: 0,
    username: '',
    password: '',
    email: '',
    avatar: '',
    registrationDate: '',
    description: '',
    displayName: '',
    roles: Roles.USER
  }
  status: string;
  errorMessage: any;

  constructor(private router: Router, private postService: PostService,
              private userService: UserService, private communityService:CommunityService,
              private reportPostService: ReportPostService) {

  }

  public ngOnInit(): void {

    this.postService.get(this.reportPost.post).subscribe(res => {
      this.post = res,
      this.loadUser(),
      this.loadCommunity();
    })

    this.userService.get(this.reportPost.byUser).subscribe(res => {
      this.reportBy = res;
    })


  }

  loadUser(){
    this.userService.get(this.post.user).subscribe(res => {
      this.user = res;
    })
  }

  loadCommunity(){
    this.communityService.get(this.post.community).subscribe(res => {
      this.community = res;
    })
  }

  acceptReport(reportId:number){

    this.reportPostService.acceptReport(reportId).subscribe({
      next: data => {
          this.status = 'Successful accept report';
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      },
      complete: () => this.changed.emit(true)
  });

  }

  declineReport(reportId:number){

    this.reportPostService.declineReport(reportId).subscribe({
      next: data => {
          this.status = 'Successful decline report';
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      },
      complete: () => this.changed.emit(true)
  });

  }



}
