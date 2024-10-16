import { UserType } from "../types/authTypes";


// URL base para la API
const BASE_URL = 'https://670f22de3e7151861656a966.mockapi.io/api/v1/Usuarios';

// Función para manejar el login
export const loginUser = async (usuario: string, contraseña: string): Promise<UserType | null> => {
  try {
    const response = await fetch(BASE_URL);
    const users: UserType[] = await response.json();

    // Filtramos el usuario por 'usuario' y 'contraseña'
    const user = users.find((u) => u.usuario === usuario && u.contraseña === contraseña);
    return user || null;
  } catch (error) {
    console.error('Error durante el login:', error);
    return null;
  }
};

// Función para manejar el registro de un nuevo usuario
export const registerUser = async (newUser: UserType): Promise<boolean> => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    return response.ok;
  } catch (error) {
    console.error('Error durante el registro:', error);
    return false;
  }
};
