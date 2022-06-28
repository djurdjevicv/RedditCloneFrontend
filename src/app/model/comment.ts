
import { ReportPost } from "./reportPost";


export interface Comment{
  commentId:number;
  text:string;
  timestamp:"";
  //repliesTo;
  //reactions: Reaction[];
  //comment;
  user:number;
  post:number;
}

