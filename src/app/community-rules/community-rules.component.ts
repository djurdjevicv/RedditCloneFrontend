import { Component, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogAddCommunityRulesComponent } from '../dialog-add-community-rules/dialog-add-community-rules.component';
import { Community } from '../model/community';
import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication-service.service';
import { CommunityService } from '../services/community/community.service';
import { JwtUtilsService } from '../services/jwt-utils.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-community-rules',
  templateUrl: './community-rules.component.html',
  styleUrls: ['./community-rules.component.scss']
})
export class CommunityRulesComponent implements OnInit {

  communityId:number;

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


  constructor(public dialog : DialogAddCommunityRulesComponent, public dialogRules : MatDialog, private router: ActivatedRoute,
              private jwtUtilsService: JwtUtilsService, private authService: AuthenticationService,
              private userService: UserService, private communityService: CommunityService) {

              this.communityId = this.router.snapshot.params['id'];
              this.logUser = authService.getCurrentUser();

              this.communityService.get(this.communityId).subscribe(res => {
                this.currentCommunity = res;
              })

    }


  ngOnInit(): void {
    this.getLogUser();
  }

  openDialog(): void {
    this.dialogRules.open(DialogAddCommunityRulesComponent, {data:this.communityId});
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


