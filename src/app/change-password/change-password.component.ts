import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPassword } from '../model/resetPassword';
import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication-service.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  password: ResetPassword = {
    oldPassword: '',
    newPassword: ''
  }
  errorMessage: any;
  loggUser:User;

  formPassword:FormGroup;

  constructor(private router: Router, private userService: UserService, private authService:AuthenticationService,
              private fb: FormBuilder) {
              this.loggUser = authService.getCurrentUser();
  }

  ngOnInit(): void {

    this.formPassword = this.fb.group({
      oldPasswordForm: ['', Validators.required ],
      password: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")] ]
    });

  }

  submit(){

    if(this.formPassword.valid){

      this.userService.changePassword(this.password, this.loggUser.username).subscribe({
        next: data => {
            confirm("Successful change password!")
            this.router.navigate(["/home"]);
        },
        error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
        },
    });

    }else{
      confirm("ERROR")
    }



  }

}
