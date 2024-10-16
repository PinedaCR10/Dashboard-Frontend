export interface UserType {
    id?: string;
    nombreCompleto: string;
    correo: string;
    usuario: string;
    contraseña: string;
  }
  
  export interface AuthContextType {
    isAuthenticated: boolean;
    login: (usuario: string, contraseña: string) => Promise<void>;
    logout: () => void;
    register: (newUser: UserType) => Promise<void>;
  }
  