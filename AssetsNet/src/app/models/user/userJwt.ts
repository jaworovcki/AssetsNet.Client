export interface UserJwt {
  id: string;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  description: string | null;
  profilePhotoUrl: string;    
  token: string;
  roles: string[];
}