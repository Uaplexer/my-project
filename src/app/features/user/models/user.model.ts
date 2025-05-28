export interface BaseUser {
  id: number;
  username: string;
  about: string;
  avatars: string;
  createdAt: Date;
}

export interface User extends BaseUser {
  email: string;
}

export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface UserRegisterRequest {
  username: string;
  email: string;
  password: string;
}
