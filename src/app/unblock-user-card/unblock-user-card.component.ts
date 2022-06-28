import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-unblock-user-card',
  templateUrl: './unblock-user-card.component.html',
  styleUrls: ['./unblock-user-card.component.scss']
})
export class UnblockUserCardComponent implements OnInit {


  @Input() user:User;
  @Output('blockUserEvent') blockUserEvent = new EventEmitter<boolean>();

  userList: Array<User> = [];
  errorMessage: any;
  status: string;

  constructor(private router: Router, private userService: UserService) {

  }

  public ngOnInit(): void {

  }

  private getBlockUsers(): void {
     this.userService.getBlockUser().subscribe({
       next: data => this.userList = data,
       error: err => console.log(err),
       complete: () => console.log('complete')
     });
  }

  unBlockUser(userId:number){
    this.userService.unBlockUser(userId).subscribe({
      next: data => {
          this.status = 'Unblock successful';
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      },
      complete: () => this.blockUserEvent.emit(true)
  });

  }

}
