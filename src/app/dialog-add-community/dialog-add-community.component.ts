import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Community } from '../model/community';
import { Roles } from '../model/enums/roles';
import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication-service.service';
import { CommunityService } from '../services/community/community.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-dialog-add-community',
  templateUrl: './dialog-add-community.component.html',
  styleUrls: ['./dialog-add-community.component.scss']
})

@Injectable({providedIn : "root"})

export class DialogAddCommunityComponent implements OnInit {

  newCommunity:Community = {
    communityId: 0,
    name: '',
    description: '',
    creationDate: null,
    moderator: 2
  }
  logUser:User;
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

  requiredForm: FormGroup;
  userRoles = Roles.USER;

  constructor(private router:Router, private communityService:CommunityService, private userService:UserService,
              private authService:AuthenticationService, private fb: FormBuilder) {
                this.logUser = authService.getCurrentUser();




   }

  ngOnInit(): void {


    this.userService.getByUsername(this.logUser.username).subscribe(res => {
      this.currentUser = res;
    })

    this.requiredForm = this.fb.group({
      name: ['', Validators.required ],
      description: ['', Validators.required]
      });

  }



  btnCreateCommunity(){

    console.log(this.requiredForm.valid)

    if(this.requiredForm.valid){
      this.addCommunity();
      this.router.navigate(["/home"]);
      window.location.reload();
    }else{
      confirm("Error!")
    }


  }


  addCommunity(): void {
    this.newCommunity.moderator = this.currentUser.userId;

    this.communityService.save(this.newCommunity).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: () => console.log('error'),
      complete: () => {

        if(this.currentUser.roles.toString() === "USER"){
          this.changeUserToModerator();
          this.authService.logout();
          this.router.navigate(['/home']);
          window.location.reload();
        }
      }
    })
  }

  changeUserToModerator(){
    this.userService.changeUserToModerator(this.currentUser.userId).subscribe({
      next:(data) => console.log(this.currentUser.username + " is now moderator!"),
      error: () => console.log('error')
    })
  }

}
