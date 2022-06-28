import { NumberValueAccessor } from "@angular/forms";


export interface Banned{
  bannedId:number;
  timestamp:string;
  byUser:number;
  communit:number;
  bannedReason:string
}
