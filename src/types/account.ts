export interface UserDataInterface {
  name: string;
  email: string;
  initialsImageUrl: string;
}
export interface AccountContextInterface {
  user: UserDataInterface | null;
  setUser: (userData: UserDataInterface) => void;
}
