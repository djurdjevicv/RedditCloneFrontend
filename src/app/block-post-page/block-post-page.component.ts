import { Component, OnInit } from '@angular/core';
import { ReportPost } from '../model/reportPost';
import { ReportPostService } from '../services/report/reportPost.service';

@Component({
  selector: 'app-block-post-page',
  templateUrl: './block-post-page.component.html',
  styleUrls: ['./block-post-page.component.scss']
})
export class BlockPostPageComponent implements OnInit {

  reportedPostsList: Array<ReportPost> = []

  constructor(private reportPostService:ReportPostService) { }

  ngOnInit(): void {
    this.getAllReportedPosts();

  }

  getAllReportedPosts(){
    this.reportPostService.getAll().subscribe(res => {
      this.reportedPostsList = res;
    })
  }


  public changed(event: any): void {
    this.getAllReportedPosts();
  }



}
