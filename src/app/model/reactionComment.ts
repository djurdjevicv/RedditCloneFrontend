

import { ReactionType } from "./enums/reactionType";

export interface ReactionComment{

  reactionId:number;
  type:ReactionType;
  timestamp:string;
  user:number;
  comment:number;

}
