export interface UserPayload {
  uuid: string;
  name: string;
  username: string;
  createdAt: string;
  status: string;
}

export interface ValidateUserTokenResponse {
  valid: boolean;
  payload?: UserPayload;
  error?: string;
}
