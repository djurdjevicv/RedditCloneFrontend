import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-block-moderators-page',
  templateUrl: './block-moderators-page.component.html',
  styleUrls: ['./block-moderators-page.component.scss']
})
export class BlockModeratorsPageComponent implements OnInit {

  empList: Array<User> = [];

  isLoadUser = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {

    this.getAllModerators();

  }

  private getAllModerators(): void {
    this.userService.getAllModerators().subscribe({
      next: data =>{
       this.empList = data,
       this.isLoadUser = true;
       if(this.empList.length === 0){
         this.isLoadUser = false;
       }
      },
      error: err => console.log(err),
      complete: () => console.log('complete')
    });
 }

 public changed(event: any): void {
   this.getAllModerators();
 }

}
