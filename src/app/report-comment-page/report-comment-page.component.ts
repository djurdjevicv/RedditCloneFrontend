import { Component, OnInit } from '@angular/core';
import { ReportComment } from '../model/reportComment';
import { ReportCommentService } from '../services/report/reportComment.service';

@Component({
  selector: 'app-report-comment-page',
  templateUrl: './report-comment-page.component.html',
  styleUrls: ['./report-comment-page.component.scss']
})
export class ReportCommentPageComponent implements OnInit {

  reportedCommentList: Array<ReportComment> = []

  constructor(private reportCommentService: ReportCommentService) { }

  ngOnInit(): void {
    this.getAllReportedComment();
  }

  getAllReportedComment(){
    this.reportCommentService.getAll().subscribe(res => {
      this.reportedCommentList = res;
    })
  }


  public changed(event: any): void {
    this.getAllReportedComment();
  }

}
