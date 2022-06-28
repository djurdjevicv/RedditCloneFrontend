import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ReportComment } from "src/app/model/reportComment";


@Injectable({
  providedIn: 'root'
})
export class ReportCommentService{

  private readonly path = "http://localhost:8080/api/reportComment";

  constructor(private http: HttpClient) { }

  getAll():Observable<ReportComment[]>{
    return this.http.get<ReportComment[]>(this.path);
  }

  save(reportComment:ReportComment): Observable<any>{
    return this.http.post(`${this.path}/create`,{
      reason: reportComment.reason,
      byUser: reportComment.byUser,
      comment: reportComment.comment
    }, {responseType: 'text'});
  }

  acceptReport(reportId:number){
    return this.http.delete(`${this.path}/acceptReport/${reportId}`);
  }

  declineReport(reportId:number){
    return this.http.delete(`${this.path}/declineReport/${reportId}`);
  }



}
