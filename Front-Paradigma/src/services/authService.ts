import { UserType } from "../types/authTypes";

// URL base para la API
const Login = 'https://localhost:7230/api/Auth/login';

// Función para manejar el login
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch(Login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }) // Envía los datos en el cuerpo de la solicitud
    });

    if (!response.ok) {
      // Maneja errores de respuesta HTTP no exitosos
      const errorText = await response.text();
      throw new Error(errorText || 'Error en la solicitud de login');
    }

    const user = await response.json();
    return user; // Devuelve el usuario en caso de éxito
  } catch (error) {
    console.error('Error durante el login:', error);
    return null;
  }
};



//register
const Register = 'https://localhost:7230/api/Auth/register';
// Función para manejar el registro de un nuevo usuario
export const registerUser = async (newUser: UserType): Promise<boolean> => {
  try {
    const response = await fetch(Register, {
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
