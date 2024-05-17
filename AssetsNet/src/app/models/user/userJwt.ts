export interface UserJwt {
  id: string;
  username: string;
  email: string;
  profilePhotoUrl: string;    
  token: string;
  roles: string[];
}