import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Flair } from "src/app/model/flair";


@Injectable({
  providedIn: 'root'
})
export class FlairService{

  private readonly path = "http://localhost:8080/api/communityFlair";

  constructor(private http: HttpClient) { }

  getFlairByCommunity(communityId:number):Observable<Flair[]>{
    return this.http.get<Flair[]>(this.path+`/${communityId}`);
  }

  get(id:number):Observable<Flair>{
    return this.http.get<Flair>(this.path+`/oneFlairById/${id}`);
  }

  create(flair:Flair): Observable<any>{
    return this.http.post(`${this.path}/create`,{
      name: flair.name,
      communityId: flair.communityId,
      active: flair.active
    }, {responseType: 'text'});
  }

  delete(id:number){
    return this.http.delete(`${this.path}/${id}`);
  }

  changeData(flair:Flair): Observable<any>{
    return this.http.put(`${this.path}/${flair.flairId}`,{
      name: flair.name
    }, {responseType: 'text'});
  }


}
