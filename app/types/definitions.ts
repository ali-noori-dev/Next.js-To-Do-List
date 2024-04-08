export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CreateAccountPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthenticateUserPayload {
  email: string;
  password: string;
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

export type CreateAccountResult = User | GeneralErrorModel;

export interface AuthenticationResult {
  status: "success" | "error";
  errors?: FormErrors;
}

export interface IToastService {
  success(msg: string, id?: string): void;
  error(msg: string, id?: string): void;
}

export type AuthenticateUserResult = LoginSuccessResult | GeneralErrorModel;

export interface LoginSuccessResult {
  token: string;
}

export interface Task {
  id: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface AddTaskPayload {
  description: string;
}

export interface EditTaskPayload {
  completed: boolean;
  id: string;
}
