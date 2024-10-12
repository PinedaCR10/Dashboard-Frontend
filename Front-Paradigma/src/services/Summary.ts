import { Summary } from "../types/SummaryType";

export const GetAllSummaryData = async (): Promise<Summary[]> => {
  try {
    const response = await fetch('https://6709cb24af1a3998baa259e8.mockapi.io/api/SummaryData');
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    const data: Summary[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};