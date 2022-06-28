import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Community } from '../model/community';
import { CommunityService } from '../services/community/community.service';

@Component({
  selector: 'app-all-community',
  templateUrl: './all-community.component.html',
  styleUrls: ['./all-community.component.scss']
})
export class AllCommunityComponent implements OnInit {

  listCommunity: Array<Community> = [];

  constructor(private communityService : CommunityService, private router: Router) { }

  ngOnInit(): void {
    this.communityService.getAll().subscribe(res => {
      this.listCommunity = res;
    })
  }

  goToCommunity(id:number):void{
    this.router.navigate(['/communityPage/' + id], { state: { id:  id} });
  }


}
