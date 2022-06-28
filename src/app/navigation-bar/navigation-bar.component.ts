import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor(
              public dialogLogIn : MatDialog,
              public dialogSign : MatDialog,
              public dialogSignUp : SignupComponent) { }

  ngOnInit(): void {
  }


  openDialogSignUp(): void {
    const dialogConfig = new MatDialogConfig();
    this.dialogSign.open(SignupComponent, dialogConfig);
  }



}
