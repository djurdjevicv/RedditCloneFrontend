import { ReactionType } from "./enums/reactionType";
import { ReportPost } from "./reportPost";


export interface Post{
  postId:number;
  title:string;
  text:string;
  creationDate:string;
  imagePath:string;
  community:number;
  user:number;
  flair:number;
}
