import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Banned } from "src/app/model/banned";


@Injectable({
  providedIn: 'root'
})
export class SuspendCommunityService{

  private readonly path = "http://localhost:8080/api/banned";

  constructor(private http: HttpClient) { }


  createSuspendCommunity(banned:Banned): Observable<any>{
    return this.http.post(`${this.path}/create`,{
      byUser: banned.byUser,
      community: banned.communit,
      bannedReason: banned.bannedReason
    }, {responseType: 'text'});
  }

}
