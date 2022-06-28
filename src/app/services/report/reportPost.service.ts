import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ReportPost } from "src/app/model/reportPost";


@Injectable({
  providedIn: 'root'
})
export class ReportPostService{

  private readonly path = "http://localhost:8080/api/reportPost";

  constructor(private http: HttpClient) { }

  getAll():Observable<ReportPost[]>{
    return this.http.get<ReportPost[]>(this.path);
  }

  save(reportPost:ReportPost): Observable<any>{
    return this.http.post(`${this.path}/create`,{
      reason: reportPost.reason,
      byUser: reportPost.byUser,
      post: reportPost.post
    }, {responseType: 'text'});
  }

  acceptReport(reportId:number){
    return this.http.delete(`${this.path}/acceptReport/${reportId}`);
  }

  declineReport(reportId:number){
    return this.http.delete(`${this.path}/declineReport/${reportId}`);
  }



}
