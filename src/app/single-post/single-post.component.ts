import { Component, Input, OnInit, Output , EventEmitter} from '@angular/core';
import { Community } from '../model/community';
import { Post } from '../model/post';
import { User } from '../model/user';
import { CommunityService } from '../services/community/community.service';
import { PostService } from '../services/post/post.service';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { Roles } from '../model/enums/roles';
import { ReactionPostService } from '../services/reactionPost/reactionPost.service';
import { Karma } from '../model/karma';
import { ReactionPost } from '../model/reactionPost';
import { ReactionType } from '../model/enums/reactionType';
import { Flair } from '../model/flair';
import { FlairService } from '../services/flair/flair.service';
import { ReportPost } from '../model/reportPost';
import { ReportReason } from '../model/enums/reportReason';
import { ReportPostService } from '../services/report/reportPost.service';
import { AuthenticationService } from '../services/authentication-service.service';
import { JwtUtilsService } from '../services/jwt-utils.service';
import { IfStmt } from '@angular/compiler';


@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  @Input() post: Post;
  @Output('changed') changed = new EventEmitter<boolean>();

  divReportReason = false;

  selected: ReportReason = ReportReason.HARASSMENT;

  reportedPost: ReportPost = {
    reportId: 0,
    reason: ReportReason.BREAKES_RULES,
    timestamp: '',
    byUser: 0,
    post: 0,
    accepted: false
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
  };

  community: Community = {
    communityId: 0,
    name: '',
    description: '',
    creationDate: null,
    moderator: 0
  };

  karma: Karma = {
    karma: 0
  };

  flair: Flair = {
    flairId: 0,
    name: '',
    communityId: 0,
    active: ''
  }

  likeReaction = {
    reactionId: 0,
    type: ReactionType.UPVOTE,
    timestamp: "",
    user: 0,
    post: 0
  }

  dislikeReaction = {
    reactionId: 0,
    type: ReactionType.DOWNVOTE,
    timestamp: "",
    user: 0,
    post: 0
  }
  errorMessage: any;

  public blockUser : boolean = false

  private logUser: User = {
    userId: 0,
    username: '',
    password: '',
    email: '',
    avatar: '',
    registrationDate: '',
    description: '',
    displayName: '',
    roles: 0
  };

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


  token:string;
  uloga:any;
  noLogUser: boolean;

  constructor(
    private userService: UserService, private communityService: CommunityService,
    private router: Router, private karmaService: ReactionPostService,
    private flairService: FlairService, private reportPost: ReportPostService,
    private authService: AuthenticationService, private jwtUtilsService:JwtUtilsService ) {

      this.logUser = authService.getCurrentUser();

  }


  ngOnInit(): void {

    this.communityService.get(this.post.community).subscribe(res => {
      this.community = res;
    })

    this.userService.get(this.post.user).subscribe(res => {
      this.user = res;
    })


    if(this.logUser !== undefined){
      this.userService.getByUsername(this.logUser.username).subscribe(res => {
        this.currentUser = res;
      })
    }

    this.karmaService.getKarmaByPost(this.post.postId).subscribe(res =>{
      this.karma = res;
    })

    this.flairService.get(this.post.flair).subscribe(res =>{
      this.flair = res;
    })

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


  communityClick(id:number):void{
    this.router.navigate(['/communityPage/' + id], { state: { id:  id} });
  }

  commentClick(id:number):void{
    this.router.navigate(['/onePostWithComments/' + id], { state: { id:  id} });
  }

  likeBtn(postId:number):void{

    if(this.blockUser === true){
      confirm("You're blocked")
    }else if(this.noLogUser === true){
      confirm("Please login!")
    }else{
      this.likeReaction.post = postId;
      this.likeReaction.user = this.currentUser.userId;

      this.karmaService.save(this.likeReaction).subscribe({
        next: (data) => console.log("LIKE REACTION!"),
        error: () => console.log('error'),
        complete: () => this.changed.emit(true)
      })
    }

  }

  dislikeBtn(postId:number):void{

    if(this.blockUser === true){
      confirm("You're blocked")
    }else if(this.noLogUser === true){
      confirm("Please login!")
    }else{
      this.dislikeReaction.post = postId;
      this.dislikeReaction.user = this.currentUser.userId;

      this.karmaService.save(this.dislikeReaction).subscribe({
        next: (data) => console.log("DISLIKE REACTION"),
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

  submitReport(postId: number){

    this.reportedPost.post = postId;
    this.reportedPost.byUser = this.currentUser.userId;
    this.reportedPost.reason = this.selected;

    this.reportPost.save(this.reportedPost).subscribe({
      next: data => {
          console.log("Success report post!"),
          this.divReportReason = false
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      },
    })


  }

}
