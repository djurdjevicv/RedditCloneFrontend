import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Community } from '../model/community';
import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication-service.service';
import { CommunityService } from '../services/community/community.service';
import { JwtUtilsService } from '../services/jwt-utils.service';
import { PostService } from '../services/post/post.service';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss']
})
export class CommunityPageComponent implements OnInit {

  public communityId:number;
  public community:Community;

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

  uloga:any;
  token:string;

  public admin : boolean = false
  public moderator : boolean = false
  public user : boolean = false

  constructor(
              private router: ActivatedRoute, private routers: Router, private postService: PostService,
              private communityService: CommunityService, private jwtUtilsService: JwtUtilsService,
              private authService: AuthenticationService) {

              this.logUser = authService.getCurrentUser();
              this.communityId = this.router.snapshot.params['id'];
              this.getCommunity();
              this.getLogUser();
  }

  getCommunity():void{
    this.communityService.get(this.communityId).subscribe(res => {
      this.community = res;
      console.log(res);
    })
  }


  ngOnInit(): void {

  }

  goToRules():void{
    this.routers.navigate(['/communityRules/' + this.communityId], { state: { id:  this.communityId} });
  }

  goToFlairs():void{
    this.routers.navigate(['/communityFlairs/' + this.communityId], { state: { id:  this.communityId} });
  }

  goToAddPost():void{
    this.routers.navigate(['/addPost/' + this.communityId], { state: { id:  this.communityId} });
  }


  getLogUser(){

    if(this.logUser !== undefined){
      this.token = this.authService.getToken();
      this.uloga = this.jwtUtilsService.getRoles(this.token);

      if(this.uloga[0].authority === "ROLE_USER"){
        this.user = true;
      }else if(this.uloga[0].authority === "ROLE_MODERATOR"){
        this.moderator = true;
      }else if(this.uloga[0].authority === "ROLE_ADMIN"){
        this.admin = true;
      }

    }

  }




}
