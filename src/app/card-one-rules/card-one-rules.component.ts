import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Community } from '../model/community';
import { Rule } from '../model/rule';
import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication-service.service';
import { CommunityService } from '../services/community/community.service';
import { JwtUtilsService } from '../services/jwt-utils.service';
import { RuleService } from '../services/rules/rule.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-card-one-rules',
  templateUrl: './card-one-rules.component.html',
  styleUrls: ['./card-one-rules.component.scss']
})
export class CardOneRulesComponent implements OnInit {

  public communityId:number;

  rules:Rule[];

  isReadOnly = true;
  btnVal = "CHANGE"
  errorMessage: any;
  status: string;

  uloga:any;
  token:string;

  public moderator : boolean = false

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

  currentUser: User = {
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

  currentCommunity: Community = {
    communityId: 0,
    name: '',
    description: '',
    creationDate: null,
    moderator: 0
  }

  loadCommunityRules = false;

  constructor(private router: ActivatedRoute, private routers: Router, private ruleService: RuleService,
              private jwtUtilsService: JwtUtilsService, private authService: AuthenticationService,
              private userService: UserService, private communityService: CommunityService) {

              this.communityId = this.router.snapshot.params['id']

              this.logUser = authService.getCurrentUser();

              this.communityService.get(this.communityId).subscribe(res => {
                this.currentCommunity = res;
              })
  }

  ngOnInit(): void {
    this.getCommunityRules();
    this.getLogUser();
  }

  getCommunityRules():void{
    this.ruleService.getCommunityRules(this.communityId).subscribe({
      next: data => this.rules = data,
      error: err => console.log(err),
      complete: () => {
        this.loadCommunityRules = true;
      }
    });
  }

  btnDelete(rule:Rule){

    this.ruleService.delete(rule.ruleId).subscribe({
      next: data => {
          this.status = 'Delete successful';
          this.getCommunityRules();
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
  });

  }

  btnChange(rule:Rule){
    if(this.btnVal === "CHANGE"){
      this.btnVal = "SUBMIT",
      this.isReadOnly = false
    }else if(this.btnVal === "SUBMIT"){
      this.btnVal = "CHANGE",
      this.isReadOnly = true,

      this.ruleService.changeData(rule).subscribe({
        next: data => {
            console.log(data);
            this.getCommunityRules();
        },
        error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
        }
    });
    }

  }


  getLogUser(){

    if(this.logUser !== undefined){
      this.userService.getByUsername(this.logUser.username).subscribe({
        next: data => {
          this.currentUser = data,
          this.token = this.authService.getToken(),
          this.uloga = this.jwtUtilsService.getRoles(this.token)
        },
        error: err => console.log(err),
        complete: () => {
          if (this.uloga[0].authority === "ROLE_MODERATOR" && this.currentUser.userId === this.currentCommunity.moderator) {
            this.moderator = true;
          }
        }

      });

    }

  }

}
