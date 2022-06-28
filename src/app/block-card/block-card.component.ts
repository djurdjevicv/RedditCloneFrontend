import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from '../model/enums/roles';
import { User } from '../model/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-block-card',
  templateUrl: './block-card.component.html',
  styleUrls: ['./block-card.component.scss']
})
export class BlockCardComponent implements OnInit {

  @Input() user:User;
  @Output('changed') changed = new EventEmitter<boolean>();

  userList: Array<User> = [];
  errorMessage: any;
  status: string;

  constructor(private router: Router, private userService: UserService) {

  }

  public ngOnInit(): void {
  }


  blockUser(userId:number){
    this.userService.blockUser(userId).subscribe({
      next: data => {
          this.status = 'Block user successful';
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      },
      complete: () => this.changed.emit(true)
  });

  }


}
