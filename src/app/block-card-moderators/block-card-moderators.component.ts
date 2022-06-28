import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-block-card-moderators',
  templateUrl: './block-card-moderators.component.html',
  styleUrls: ['./block-card-moderators.component.scss']
})
export class BlockCardModeratorsComponent implements OnInit {

  @Input() moderator:User;
  @Output('changed') changed = new EventEmitter<boolean>();

  userList: Array<User> = [];
  errorMessage: any;
  status: string;

  constructor(private router: Router, private userService: UserService) {

  }

  public ngOnInit(): void {
  }

  blockModerator(userId:number){

    this.userService.blockModerator(userId).subscribe({
      next: data => {
          this.status = 'Block moderator successful';
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      },
      complete: () => this.changed.emit(true)
  });

  }


}
