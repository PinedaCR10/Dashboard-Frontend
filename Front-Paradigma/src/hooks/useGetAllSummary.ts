import { useEffect, useState, useCallback } from 'react';
import { Summary } from '../types/SummaryType';
import { GetAllSummaryData } from '../services/Summary';

export const useGetAllSummary = () => {
  const [data, setData] = useState<Summary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Definimos fetchData como una función de callback para poder llamarla desde fuera del hook
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await GetAllSummaryData();
      setData(result);
      setLoading(false);
    } catch {
      setError('Error al obtener los datos');
      setLoading(false);
    }
  }, []);

  // Llamamos a fetchData una vez al montar el componente
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, fetchData };
};
