import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  selector: 'app-card-flair',
  templateUrl: './card-flair.component.html',
  styleUrls: ['./card-flair.component.scss']
})
export class CardFlairComponent implements OnInit {

  @Input() flair: Flair;
  @Output('changed') changed = new EventEmitter<boolean>();

  public communityId:number;

  isReadOnly = true;
  btnValue = "CHANGE"

  status: string;
  errorMessage: any;

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
  currentCommunity: Community = {
    communityId: 0,
    name: '',
    description: '',
    creationDate: null,
    moderator: 0
  }

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

  constructor(private router: ActivatedRoute, private routers: Router, private flairService: FlairService,
              private jwtUtilsService: JwtUtilsService, private authService: AuthenticationService,
              private userService: UserService, private communityService:CommunityService) {

              this.logUser = authService.getCurrentUser();
              this.communityId = this.router.snapshot.params['id']

              this.communityService.get(this.communityId).subscribe(res => {
                this.currentCommunity = res;
              })


  }

  ngOnInit(): void {

    this.getLogUser();

  }

  deleteFlair(flairId: number){
    this.flairService.delete(flairId).subscribe({
            next: data => {
                this.status = 'Delete successful';
            },
            error: error => {
                this.errorMessage = error.message;
                console.error('There was an error!', error);
            },
            complete: () => this.changed.emit(true)
        });
  }

  changeFlair(flair:Flair){

    if(this.btnValue === "CHANGE"){
      this.btnValue = "SUBMIT";
      this.isReadOnly = false;
    }else if(this.btnValue === "SUBMIT"){

      this.flairService.changeData(flair).subscribe({
        next: data => {
            console.log(data);
            this.btnValue = "CHANGE";
            this.isReadOnly = true;
        },
        error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
        },
        complete: () => this.changed.emit(true)
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
