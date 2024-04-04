import { User } from "next-auth";

export interface GeneralResultModel {
  message: string;
  value: User;
}

export interface GetUserDataPayload {
  id: number;
  name: string;
  email: string;
}
