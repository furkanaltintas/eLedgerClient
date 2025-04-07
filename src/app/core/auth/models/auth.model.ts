export class LoginRequest {
  email: string = "";
  password: string = "";
}

export class LoginResponse {
  token:string = "";
  refreshToken: string = "";
  dateTime: Date = new Date();
}
