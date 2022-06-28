import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Rule } from "src/app/model/rule";


@Injectable({
  providedIn: 'root'
})
export class RuleService{

  private readonly path = "http://localhost:8080/api/rules";

  constructor(private http: HttpClient) { }

  getAll():Observable<Rule[]>{
    return this.http.get<Rule[]>(this.path);
  }

  getCommunityRules(id:number):Observable<Rule[]>{
    return this.http.get<Rule[]>(this.path+`/community`+`/${id}`);
  }

  get(id:number):Observable<Rule>{
    return this.http.get<Rule>(this.path+`/${id}`);
  }

  save(rule:Rule): Observable<any>{
    return this.http.post(`${this.path}/create`,{
      description: rule.description,
      community: rule.community
    }, {responseType: 'text'});
  }

  // save(rule:Rule): Observable<any>{
  //   return this.http.post(`${this.path}/create`, {responseType: 'text'});
  // }

  delete(id:number){
    return this.http.delete(`${this.path}/${id}`);
  }

  changeData(rule:Rule): Observable<any>{
    return this.http.put(`${this.path}/${rule.ruleId}`,{
      description: rule.description
    }, {responseType: 'text'});
  }

}
