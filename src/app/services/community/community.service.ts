import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Community } from "src/app/model/community";

@Injectable({
  providedIn: 'root'
})
export class CommunityService{

  private readonly path = "http://localhost:8080/api/communities";

  constructor(private http: HttpClient) { }

  getAll():Observable<Community[]>{
    return this.http.get<Community[]>(this.path);
  }

  get(id:number):Observable<Community>{
    return this.http.get<Community>(this.path+`/${id}`);
  }


  save(community:Community): Observable<any>{
    return this.http.post(`${this.path}/create`,{
      name: community.name,
      description: community.description,
      moderator: community.moderator
    }, {responseType: 'text'});
  }

  delete(id:number){
    return this.http.delete(`${this.path}/${id}`);
  }


}
