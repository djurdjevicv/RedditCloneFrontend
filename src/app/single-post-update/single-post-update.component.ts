import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from '../model/enums/roles';
import { Post } from '../model/post';
import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication-service.service';
import { PostService } from '../services/post/post.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-single-post-update',
  templateUrl: './single-post-update.component.html',
  styleUrls: ['./single-post-update.component.scss']
})
export class SinglePostUpdateComponent implements OnInit {

  @Output('changed') changed = new EventEmitter<boolean>();

  public postList: Post[];


  logUser:User;

  user:User = {
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

  chengedPost: Post = {
    postId: 0,
    title: '',
    text: '',
    creationDate: '',
    imagePath: '',
    community: 0,
    user: 0,
    flair: 0
  }


  isButtonVisible = false;
  isButtonVisible1 = false;
  status: string;
  errorMessage: any;
  http: any;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private router: Router,
    private authService: AuthenticationService
    ) {

      this.logUser = authService.getCurrentUser();


    }

  ngOnInit(): void {
    this.getPosts();
    this.getUser();
  }

  getUser():void{
    this.userService.getByUsername(this.logUser.username).subscribe(res => {
      this.user = res;
    })
  }

  getPosts():void{
    this.postService.getOneUserPosts(this.logUser.username).subscribe(res => {
      this.postList = res;
      console.log(res);
    })
  }

  izmenaTexta():void{
    if(this.isButtonVisible === true){
      this.isButtonVisible = false
    }else{
      this.isButtonVisible = true
    }
  }

  izmenaNaslova():void{
    if(this.isButtonVisible1 === true){
      this.isButtonVisible1 = false
    }else{
      this.isButtonVisible1 = true
    }
  }

  changeTitleSumbit(post:Post){
    this.postService.get(post.postId).subscribe(res => {
      this.chengedPost = res;
      console.log(res);
    })

    this.postService.change(post).subscribe({
        next: data => {
            console.log(data);
            this.getPosts();
            this.isButtonVisible = false
            this.isButtonVisible1 = false
        },
        error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
        }
    });

  }

  changeTextSumbit(post:Post){
    this.postService.get(post.postId).subscribe(res => {
      this.chengedPost = res;
      console.log(res);
    })

    this.postService.change(post).subscribe({
        next: data => {
            console.log(data);
            this.getPosts();
            this.isButtonVisible = false
            this.isButtonVisible1 = false
        },
        error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
        }
    });

  }

  deletePost(postId: number){
    this.postService.delete(postId).subscribe({
            next: data => {
                this.status = 'Delete successful';
                this.getPosts();
            },
            error: error => {
                this.errorMessage = error.message;
                console.error('There was an error!', error);
            }
        });
  }

}
