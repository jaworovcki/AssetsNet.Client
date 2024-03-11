export interface UserJwt {
  id: string;
  username: string;
  email: string;
  token: string;
  roles: string[];
}