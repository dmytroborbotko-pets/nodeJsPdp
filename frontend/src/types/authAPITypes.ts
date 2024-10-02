import { BaseResponse } from "./baseAPITypes";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse extends BaseResponse {
  token: string;
  userId: string;
}

export interface LogoutResponse extends BaseResponse {}
