import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Comment } from '../model/comment';
import { Roles } from '../model/enums/roles';
import { Post } from '../model/post';
import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication-service.service';
import { CommentService } from '../services/comments/comment.service';
import { JwtUtilsService } from '../services/jwt-utils.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-list-of-comments',
  templateUrl: './list-of-comments.component.html',
  styleUrls: ['./list-of-comments.component.scss']
})
export class ListOfCommentsComponent implements OnInit {

  @Input() post: Post;
  @Input() commentList: Array<Comment>;
  @Output('addComment') addComment = new EventEmitter<boolean>();

  newComment: Comment = {
    commentId: 0,
    text: '',
    timestamp: "",
    user: 0,
    post: 0
  }

  logUser: User;

  userForComment: User;
  token: string;
  uloga: any;

  blockUser = false;
  noLogUser = false;

  constructor(private commentService:CommentService, private authService:AuthenticationService,
              private userService:UserService, private jwtUtilsService:JwtUtilsService) {

                this.userForComment = {
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

                this.logUser = authService.getCurrentUser();

                if(this.logUser !== undefined){
                  this.token = this.authService.getToken();
                  this.uloga = this.jwtUtilsService.getRoles(this.token);

                  if(this.uloga[0].authority === "ROLE_BLOCK_USER"){
                    this.blockUser = true;
                  }
                }

                if(this.logUser === undefined){
                  this.noLogUser = true;
                }


  }

  ngOnInit(): void {

    this.getComments();

    if(this.logUser !== undefined){
      this.userService.getByUsername(this.logUser.username).subscribe(res =>{
        this.userForComment = res
      })
    }

  }

  private getComments(): void {
    this.commentService.getCommentsByPost(this.post.postId).subscribe(res => {
      this.commentList = res
    })
  }


  btnAddComment(){

    if(this.logUser !== undefined){
      this.newComment.post = this.post.postId;
      this.newComment.user = this.userForComment.userId;

      this.commentService.save(this.newComment).subscribe({
        next: (data) => this.getComments(),
        error: () => console.log('error')
      })
    }else{
      confirm("Please login!")
    }




  }

  public changed(event: any): void {
    this.getComments();
  }




}
