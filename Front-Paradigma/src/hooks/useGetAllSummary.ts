import { useEffect, useState } from 'react';
import { Summary } from '../types/SummaryType';
import { GetAllSummaryData } from '../services/Summary';


export const useGetAllSummary = () => {
  const [data, setData] = useState<Summary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await GetAllSummaryData();
        setData(result);
        setLoading(false);
      } catch {
        setError('Error al obtener los datos');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
