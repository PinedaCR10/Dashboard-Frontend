import { Dispatch, SetStateAction } from "react";

export type User = {
  name: string;
  cedula: string;
  email: string;
  phone: string;
  address: string;
  lastName: string;
  role: string;
};

export interface UserContextType {
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
}
