import { useEffect, useState } from 'react';
import { DashboardData } from '../types/DashboardType';
import { GetAllDashboardData } from '../services/Dashboard';
;


export const useGetAllDashboardData = () => {
  const [data, setData] = useState<DashboardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await GetAllDashboardData();
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
