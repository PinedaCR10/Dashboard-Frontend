import { Activity } from "../types/ActivityType";


export const GetAllActivity = async (): Promise<Activity[]> => {
  try {
    const response = await fetch('https://6709cb24af1a3998baa259e8.mockapi.io/api/useractivity');
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    const data: Activity[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};