import { UserType } from "../types/authTypes";

const Login = 'https://localhost:7230/api/Auth/login';


// el token que recibe el frontend al hacer login se guarde en localStorage en lugar de un valor estático
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch(Login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }) 
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error en la solicitud de login');
    }

    const data = await response.json();
    // Supongamos que `data` incluye `{ token: 'JWT_TOKEN_VALUE' }`
    localStorage.setItem('authToken', data.token); // Guardamos el token real en localStorage
    return data; // Devuelve los datos del usuario en caso de éxito
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
