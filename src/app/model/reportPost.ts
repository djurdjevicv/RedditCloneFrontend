import { ReportReason } from "./enums/reportReason";

export interface ReportPost{

  reportId:number;
  reason:ReportReason;
  timestamp:"";
  byUser:number;
  post:number;
  accepted: boolean;
}
