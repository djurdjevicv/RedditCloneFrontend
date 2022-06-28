import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-block-user-page',
  templateUrl: './block-user-page.component.html',
  styleUrls: ['./block-user-page.component.scss']
})
export class BlockUserPageComponent implements OnInit {

  empList: Array<User> = [];

  blockEmpList: Array<User> = [];

  isLoadBlockUser = false;
  isLoadUser = false;

  constructor(private router: Router, private userService: UserService) {

  }

  public ngOnInit(): void {
    this.getAllUsers();
    this.getBlockUsers();
  }

  private getAllUsers(): void {
     this.userService.getAllUser().subscribe({
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

  private getBlockUsers(): void {
    this.userService.getBlockUser().subscribe({
      next: data => {
        this.blockEmpList = data,
        this.isLoadBlockUser = true;
        if(this.blockEmpList.length === 0){
          this.isLoadBlockUser = false;
        }
      },
      error: err => console.log(err),
      complete: () => console.log('complite')
    });
 }

  public changed(event: any): void {
    this.getAllUsers();
    this.getBlockUsers();
  }

  public blockUserEvent(event: any):void{
    this.getAllUsers();
    this.getBlockUsers();
  }

}
