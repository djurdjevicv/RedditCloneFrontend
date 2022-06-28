import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../model/comment';
import { Roles } from '../model/enums/roles';
import { ReportComment } from '../model/reportComment';
import { User } from '../model/user';
import { CommentService } from '../services/comments/comment.service';
import { ReportCommentService } from '../services/report/reportComment.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-report-comment-card',
  templateUrl: './report-comment-card.component.html',
  styleUrls: ['./report-comment-card.component.scss']
})
export class ReportCommentCardComponent implements OnInit {

  @Input() reportComment: ReportComment;
  @Output('changed') changed = new EventEmitter<boolean>();

  comment:Comment = {
    commentId: 0,
    text: '',
    timestamp: '',
    user: 0,
    post: 0
  }

  user:User = {
    userId: 0,
    username: '',
    password: '',
    email: '',
    avatar: '',
    registrationDate: '',
    description: '',
    displayName: '',
    roles: Roles.USER
  }

  reportBy:User = {
    userId: 0,
    username: '',
    password: '',
    email: '',
    avatar: '',
    registrationDate: '',
    description: '',
    displayName: '',
    roles: Roles.USER
  }
  status: string;
  errorMessage: any;

  constructor(private commentService:CommentService, private userService:UserService,
              private reportCommentService:ReportCommentService) { }

  ngOnInit(): void {

    this.commentService.getOneById(this.reportComment.comment).subscribe(res => {
      this.comment = res,
      this.loadUser();
    })

    this.userService.get(this.reportComment.byUser).subscribe(res => {
      this.reportBy = res;
    })

  }

  loadUser(){
    this.userService.get(this.comment.user).subscribe(res => {
      this.user = res;
    })
  }

  acceptReport(reportId:number){

    this.reportCommentService.acceptReport(reportId).subscribe({
      next: data => {
          this.status = 'Successful accept report';
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      },
      complete: () => this.changed.emit(true)
  });

  }

  declineReport(reportId:number){

    this.reportCommentService.declineReport(reportId).subscribe({
      next: data => {
          this.status = 'Successful decline report';
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      },
      complete: () => this.changed.emit(true)
  });

  }

}
