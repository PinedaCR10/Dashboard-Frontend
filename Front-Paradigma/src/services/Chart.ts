import { ChartData } from "../types/ChartType";


export const GetAllChartData = async (): Promise<ChartData[]> => {
  try {
    const response = await fetch('https://6662962a62966e20ef091eb7.mockapi.io/api/Dashboard');
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    const data: ChartData[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
