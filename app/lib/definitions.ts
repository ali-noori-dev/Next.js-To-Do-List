export interface UserData {
  id: number;
  name: string;
  email: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface GeneralErrorModel {
  message: string;
  errors: FormErrors;
}

export interface FormErrors {
  name?: string[];
  email?: string[];
  password?: string[];
  password_confirmation?: string[];
}

export type RegisterResult = UserData | GeneralErrorModel;
