import { error } from '@angular/compiler/src/util';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Community } from '../model/community';
import { Roles } from '../model/enums/roles';
import { Flair } from '../model/flair';
import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication-service.service';
import { CommunityService } from '../services/community/community.service';
import { FlairService } from '../services/flair/flair.service';
import { JwtUtilsService } from '../services/jwt-utils.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-community-flair-page',
  templateUrl: './community-flair-page.component.html',
  styleUrls: ['./community-flair-page.component.scss']
})
export class CommunityFlairPageComponent implements OnInit {

  isAddFlairVisible = false;
  newFlair:string;
  communityId:number;

  uloga:any;
  token:string;

  flairs:Flair[];

  public admin : boolean = false
  public moderator : boolean = false
  public user : boolean = false

  flair:Flair = {
    flairId: 0,
    name: '',
    communityId: 0,
    active: ''
  }
  errorMessage: any;

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

  currentCommunity: Community = {
    communityId: 0,
    name: '',
    description: '',
    creationDate: null,
    moderator: 0
  }

  currentUser: User = {
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

  flairForm: FormGroup;
  loadCurrentCommunity = false;
  loadCurrentUser = false;

  constructor(private router: ActivatedRoute, private routers: Router, private flairService: FlairService,
              private jwtUtilsService: JwtUtilsService, private authService: AuthenticationService, private fb: FormBuilder,
              private userService: UserService, private communityService: CommunityService) {

              this.logUser = authService.getCurrentUser();
              this.communityId = this.router.snapshot.params['id']

              this.communityService.get(this.communityId).subscribe(res => {
                this.currentCommunity = res;
              })


  }

  ngOnInit(): void {

    this.getLogUser();

    this.getCommunityFlairs();

    this.flairForm = this.fb.group({
      name: ['', Validators.required ]
    });


  }

  addFlairDiv():void{

    if(this.isAddFlairVisible === false){
      this.isAddFlairVisible = true
    }else if(this.isAddFlairVisible === true){
      this.isAddFlairVisible = false
    }

  }

  getCommunityFlairs():void{

    this.flairService.getFlairByCommunity(this.communityId).subscribe({
      next: data => this.flairs = data,
      error: err => console.log(err),
      complete: () => console.log('complete')
    });
  }

  submitAddFlair():void{

    this.flair.name = this.newFlair;
    this.flair.communityId = this.communityId;
    this.flair.active = "true";

    if(this.flairForm.valid){

      console.log(this.flair)
      this.flairService.create(this.flair).subscribe({
        next: data => {
            console.log(data)
        },
        error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
        },
        complete: () =>{
          this.getCommunityFlairs(),
          this.isAddFlairVisible = false;
        }
      })
    }else{
      confirm("ERROR")
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

  public changed(event: any): void {
    this.getCommunityFlairs();
  }







}
