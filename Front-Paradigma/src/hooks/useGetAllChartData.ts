import { useEffect, useState } from 'react';
import { ChartData } from '../types/ChartType';
import { GetAllChartData } from '../services/Chart';


export const useGetAllChartData = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await GetAllChartData();
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
