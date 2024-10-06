import { DashboardData } from "../types/DashboardType";


export const GetAllDashboardData = async (): Promise<DashboardData[]> => {
  try {
    const response = await fetch('https://6662962a62966e20ef091eb7.mockapi.io/api/Dashboard');
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    const data: DashboardData[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};