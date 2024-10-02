import { BaseResponse } from "./baseAPITypes";

export interface UserPayload {
  username: string;
  email: string;
  password: string;
}

export interface UserResponse extends BaseResponse {}
