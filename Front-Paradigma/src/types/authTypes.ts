export interface UserType {
  username: string;
  password: string;
  fullName: string;
  email: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (newUser: UserType) => Promise<void>;
}
