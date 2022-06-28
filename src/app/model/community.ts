import { NumberValueAccessor } from "@angular/forms";
import { Banned } from "./banned";
import { ReportReason } from "./enums/reportReason";
import { Flair } from "./flair";
import { Post } from "./post";
import { Rule } from "./rule";
import { User } from "./user";

export interface Community{

  communityId:number;
  name:string;
  description:string;
  creationDate:Date | null;
  moderator:number;



}
