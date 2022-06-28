import { Roles } from "./enums/roles";

export interface User{

  userId:number;
  username:string;
  password:string;
  email:string;
  avatar:string;
  registrationDate:string;
  description:string;
  displayName:string;
  roles:Roles;


}
