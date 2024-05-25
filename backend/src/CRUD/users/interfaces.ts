import { ObjectId } from "mongodb";

export interface LoginSuccessResult {
    success: true;
    message: string;
    token: string;
    _id : string;
    email: string;
}

export interface LoginFailureResult {
    success: false;
    message: string;
}

export type LoginResult = LoginSuccessResult | LoginFailureResult;
