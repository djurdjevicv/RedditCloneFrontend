import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Comment } from "src/app/model/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService{

  private readonly path = "http://localhost:8080/api/comments";

  constructor(private http: HttpClient) { }

  getCommentsByPost(postId:number):Observable<Comment[]>{
    return this.http.get<Comment[]>(this.path+`/${postId}`);
  }

  getOneById(id:number):Observable<Comment>{
    return this.http.get<Comment>(this.path+`/getOneById/${id}`);
  }

  save(comment:Comment): Observable<any>{
    return this.http.post(`${this.path}/create`,{
      text: comment.text,
      user: comment.user,
      post: comment.post
    }, {responseType: 'text'});
  }


}
