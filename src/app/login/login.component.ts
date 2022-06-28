import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { JwtAuthenticationRequest } from '../model/JwtAuthenticationRequest';
import { NavComponent } from '../nav/nav.component';
import { AuthenticationService } from '../services/authentication-service.service';
import { UserService } from '../services/user/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService]
})

export class LoginComponent implements OnInit {


  username: string;
  password: string;

  newUser: JwtAuthenticationRequest = {
    username: '',
    password: ''
  }

  public wrongUsernameOrPass:boolean;

  constructor(private authService : AuthenticationService, private router : Router) {
    this.wrongUsernameOrPass = false;
  }

  ngOnInit() {
  }

  login():void{
    this.authService.login(this.newUser).subscribe(
      (loggedIn:boolean) => {
        if(loggedIn){
          this.router.navigate(['/home']);
          window.location.reload();
        }
      }
    ,
    (err:Error) => {
      if(err.message === 'error.json is not a function'){
        this.wrongUsernameOrPass = true;
      }
      else{
        throwError(() => err);
      }
    });
  }





}
