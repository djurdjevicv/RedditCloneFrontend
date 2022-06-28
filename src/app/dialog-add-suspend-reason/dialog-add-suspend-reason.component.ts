import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Banned } from '../model/banned';
import { Community } from '../model/community';
import { CommunityService } from '../services/community/community.service';
import { SuspendCommunityService } from '../services/suspendCommunity/suspend-community.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-dialog-add-suspend-reason',
  templateUrl: './dialog-add-suspend-reason.component.html',
  styleUrls: ['./dialog-add-suspend-reason.component.scss']
})
@Injectable({providedIn : "root"})
export class DialogAddSuspendReasonComponent implements OnInit {

  banned: Banned = {
    bannedId: 0,
    timestamp: '',
    byUser: 1,
    communit: 0,
    bannedReason: ''
  }
  errorMessage: any;
  status: string;

  suspendReasonForm: FormGroup;

  constructor(public dialog : MatDialog, @Inject(MAT_DIALOG_DATA) public data: number,
              private suspendCommunityService:SuspendCommunityService, private communityService:CommunityService,
              private router:Router, private userService: UserService, private fb: FormBuilder) {

  }

  ngOnInit(): void {

    this.suspendReasonForm = this.fb.group({
      bannedReason: ['', Validators.required ],
    });

  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  addCommunityRules(): void {

    if(this.suspendReasonForm.valid){
      this.banned.communit = this.data;

      this.suspendCommunityService.createSuspendCommunity(this.banned).subscribe({
        next: data => {
            this.status = 'Successful suspend community';
            this.deleteCommunity();
        },
        error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
        }
    });

      this.closeDialog();
    }else{
      confirm("ERROR")
    }



  }

  deleteCommunity(){

    this.communityService.delete(this.data).subscribe({
      next: data => {
          this.status = 'Successful suspend community';
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      },
      complete: () => {
        this.router.navigate(['/home' ]);
      }
  });


  }



}
