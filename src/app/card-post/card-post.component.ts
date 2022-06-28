import { state } from '@angular/animations';
import { identifierName } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommunityPageComponent } from '../community-page/community-page.component';
import { Community } from '../model/community';
import { Post } from '../model/post';
import { User } from '../model/user';
import { CommunityService } from '../services/community/community.service';
import { PostService } from '../services/post/post.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss']
})
export class CardPostComponent implements OnInit {

  postList: Array<Post> = [];


  constructor(private router: Router, private postService: PostService, private userService: UserService,
    private communityService:CommunityService, private communityPage: CommunityPageComponent) {

  }

  public ngOnInit(): void {

    this.getAllPosts();

  }

  private getAllPosts(): void {
    this.postService.getAll().subscribe(res => {
      this.postList = res;
    })

  }


  communityClick(id:number):void{
    this.router.navigate(['/communityPage/' + id], { state: { id:  id} });
  }


  public changed(event: any): void {
    this.getAllPosts();
  }

  }


