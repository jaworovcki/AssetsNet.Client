export interface User {
  id: string;
  userName: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  description: string | null;
  profilePhotoUrl: string;
  numberOfFollowers: number;
  numberOfFollowings: number;
}