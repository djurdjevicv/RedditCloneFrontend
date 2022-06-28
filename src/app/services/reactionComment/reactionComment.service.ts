import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Karma } from "src/app/model/karma";
import { ReactionComment } from "src/app/model/reactionComment";

@Injectable({
  providedIn: 'root'
})
export class ReactionCommentService{

  private readonly path = "http://localhost:8080/api/reactionComment";

  constructor(private http: HttpClient) { }


  getKarmaByComment(id:number):Observable<Karma>{
    return this.http.get<Karma>(this.path+`/comment`+`/${id}`);
  }

  getKarmaCommentByUser(username:string):Observable<Karma>{
    return this.http.get<Karma>(this.path+`/commentByUser`+`/${username}`);
  }

  save(reactionComent:ReactionComment): Observable<any>{
    return this.http.post(`${this.path}/create`,{
      reactionType: reactionComent.type,
      userId: reactionComent.user,
      commentId: reactionComent.comment
    }, {responseType: 'text'});
  }



}
