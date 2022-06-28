import { Injectable } from "@angular/core"
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { Post } from "src/app/model/post";




@Injectable({
  providedIn: 'root'
})
export class PostService{

  private readonly path = "http://localhost:8080/api/posts";

  constructor(private http: HttpClient) { }

  getAll():Observable<Post[]>{
    return this.http.get<Post[]>(this.path);
  }

  getCommunityPosts(id:number):Observable<Post[]>{
    return this.http.get<Post[]>(this.path+`/community`+`/${id}`);
  }

  get(id:number):Observable<Post>{
    return this.http.get<Post>(this.path+`/${id}`);
  }

  save(post:Post): Observable<any>{
    return this.http.post(`${this.path}/create`,{
      title: post.title,
      text: post.text,
      imagePath: post.imagePath,
      community: post.community,
      flair: post.flair,
      user: post.user
    }, {responseType: 'text'});
  }

  delete(id:number){
    return this.http.delete(`${this.path}/${id}`);
  }

  getOneUserPosts(username:string):Observable<Post[]>{
    return this.http.get<Post[]>(this.path+`/user`+`/${username}`);
  }

  change(post:Post){
    return this.http.put(`${this.path}/${post.postId}`, post);
  }

}


