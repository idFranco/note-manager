import { ErrorModel } from "./error.model";

export class LoginModel extends ErrorModel {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
}
