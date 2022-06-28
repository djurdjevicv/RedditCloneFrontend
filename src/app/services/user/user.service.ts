import { Injectable } from "@angular/core"
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "src/app/model/user";
import { ResetPassword } from "src/app/model/resetPassword";

@Injectable({
  providedIn: 'root'
})
export class UserService{

  private readonly path = "http://localhost:8080/api/users";

  constructor(private http: HttpClient) { }

  getAll():Observable<User[]>{
    return this.http.get<User[]>(this.path);
  }

  getAllUser():Observable<User[]>{
    return this.http.get<User[]>(this.path+`/onlyUser`);
  }

  getBlockUser():Observable<User[]>{
    return this.http.get<User[]>(this.path+`/onlyBlockUser`);
  }

  getAllModerators():Observable<User[]>{
    return this.http.get<User[]>(this.path+`/onlyModerators`);
  }

  get(id:number):Observable<User>{
    return this.http.get<User>(this.path+`/byId/${id}`);
  }

  getByUsername(username:string):Observable<User>{
    return this.http.get<User>(this.path+`/${username}`);
  }

  save(user:User){
    return this.http.post(this.path+`/create`, user);
  }


  changeData(user:User): Observable<any>{
    return this.http.put(`${this.path}/changeData/${user.username}`,{
      email: user.email,
      description: user.description,
      displayName: user.displayName,
      avatar: user.avatar
    }, {responseType: 'text'});
  }

  changePassword(password:ResetPassword,username:string): Observable<any>{
    return this.http.put(`${this.path}/${username}`,{
      oldPassword: password.oldPassword,
      newPassword: password.newPassword
    }, {responseType: 'text'});
  }

  blockUser(id:number){
    return this.http.delete(`${this.path}/blockUser/${id}`);
  }

  unBlockUser(id:number){
    return this.http.delete(`${this.path}/unBlockUser/${id}`);
  }

  changeUserToModerator(id:number){
    return this.http.delete(`${this.path}/changeUserToModerator/${id}`);
  }

  blockModerator(id:number){
    return this.http.delete(`${this.path}/changeModeratorToUser/${id}`);
  }



}
