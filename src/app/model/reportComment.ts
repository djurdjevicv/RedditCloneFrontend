import { ReportReason } from "./enums/reportReason";

export interface ReportComment{

  reportId:number;
  reason:ReportReason;
  timestamp:"";
  byUser:number;
  comment:number;
  accepted: boolean;
}
