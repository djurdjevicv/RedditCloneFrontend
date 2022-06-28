import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from '../model/comment';
import { ReactionType } from '../model/enums/reactionType';
import { ReportReason } from '../model/enums/reportReason';
import { Roles } from '../model/enums/roles';
import { Karma } from '../model/karma';
import { Post } from '../model/post';
import { ReportComment } from '../model/reportComment';
import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication-service.service';
import { JwtUtilsService } from '../services/jwt-utils.service';
import { ReactionCommentService } from '../services/reactionComment/reactionComment.service';
import { ReportCommentService } from '../services/report/reportComment.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {

  @Input() comment: Comment;
  @Output('changed') changed = new EventEmitter<boolean>();

  divReportReason = false;

  selected: ReportReason = ReportReason.HARASSMENT;

  userComment : User = {
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

  karma: Karma = {
    karma: 0
  };

  likeReaction = {
    reactionId: 0,
    type: ReactionType.UPVOTE,
    timestamp: "",
    user: 0,
    comment: 0
  }

  dislikeReaction = {
    reactionId: 0,
    type: ReactionType.DOWNVOTE,
    timestamp: "",
    user: 0,
    comment: 0
  }

  reportComment:ReportComment = {
    reportId: 0,
    reason: ReportReason.BREAKES_RULES,
    timestamp: '',
    byUser: 0,
    comment: 0,
    accepted: false
  }

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
  errorMessage: any;
  token: string;
  uloga: any;
  blockUser: boolean;
  noLogUser:boolean;

  currentUser:User = {
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

  constructor(
    private userService: UserService, private router: Router, private karmaService: ReactionCommentService,
    private authService:AuthenticationService, private reportCommentService: ReportCommentService,
    private jwtUtilsService:JwtUtilsService ) {

      this.logUser = authService.getCurrentUser();


  }
  ngOnInit(): void {
    this.getUserFromComment();

    this.karmaService.getKarmaByComment(this.comment.commentId).subscribe(res =>{
      this.karma = res;
    })

    if(this.logUser !== undefined){
      this.userService.getByUsername(this.logUser.username).subscribe(res => {
        this.user = res;
      })
    }

    if(this.logUser !== undefined){
      this.userService.getByUsername(this.logUser.username).subscribe(res => {
        this.currentUser = res;
      })
    }

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

  getUserFromComment(){
    this.userService.get(this.comment.user).subscribe(res => {
      this.userComment = res;
    })
  }

  likeBtn(commentId:number):void{

    if(this.blockUser === true){
      confirm("You're blocked")
    }else if(this.noLogUser === true){
      confirm("Please login!")
    }else{
      this.likeReaction.comment = commentId;
      this.likeReaction.user = this.currentUser.userId;

      this.karmaService.save(this.likeReaction).subscribe({
        next: (data) => console.log("LIKE COMMENT"),
        error: () => console.log('error'),
        complete: () => this.changed.emit(true)
      })
    }



  }

  dislikeBtn(commentId:number):void{

    if(this.blockUser === true){
      confirm("You're blocked")
    }else if(this.noLogUser === true){
      confirm("Please login!")
    }else{
      this.dislikeReaction.comment = commentId;
      this.dislikeReaction.user = this.currentUser.userId;

      this.karmaService.save(this.dislikeReaction).subscribe({
        next: (data) => console.log("DISLIKE COMMENT"),
        error: () => console.log('error'),
        complete: () => this.changed.emit(true)
      })
    }



  }

  report():void{

    if(this.blockUser === true){
      confirm("You're blocked")
    }else if(this.noLogUser === true){
      confirm("Please login!")
    }else{
      if(this.divReportReason === false){
        this.divReportReason = true
      }else{
        this.divReportReason = false
      }
    }



  }

  submitReport(commentId: number){

    this.reportComment.comment = commentId;
    this.reportComment.byUser = this.user.userId;
    this.reportComment.reason = this.selected;

    this.reportCommentService.save(this.reportComment).subscribe({
      next: data => {
          console.log("Success report comment!"),
          this.divReportReason = false
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      },
    })


  }

}
