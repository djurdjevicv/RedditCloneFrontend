import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAddSuspendReasonComponent } from '../dialog-add-suspend-reason/dialog-add-suspend-reason.component';
import { Banned } from '../model/banned';
import { Community } from '../model/community';
import { CommunityService } from '../services/community/community.service';
import { SuspendCommunityService } from '../services/suspendCommunity/suspend-community.service';

@Component({
  selector: 'app-block-community-card',
  templateUrl: './block-community-card.component.html',
  styleUrls: ['./block-community-card.component.scss']
})
export class BlockCommunityCardComponent implements OnInit {

  communityList: Array<Community> = [];
  status: string;
  errorMessage: any;

  constructor(private router: Router, private communityService: CommunityService,
              private suspendCommunity: SuspendCommunityService,
              public dialog : DialogAddSuspendReasonComponent, public dialogRules : MatDialog) {
    this.getAllCommunity();
  }

  public ngOnInit(): void {
  }

  private getAllCommunity(): void {
     this.communityService.getAll().subscribe({
       next: data => this.communityList = data,
       error: err => console.log(err),
       complete: () => console.log('complete')
     });
  }

  blockBtn(communityId:number){

    this.dialogRules.open(DialogAddSuspendReasonComponent, {data:communityId});

    }


}
