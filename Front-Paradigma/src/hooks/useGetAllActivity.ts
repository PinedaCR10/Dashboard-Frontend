import { useEffect, useState } from 'react';
import { Activity } from '../types/ActivityType';
import { GetAllActivity } from '../services/Activity';


export const useGetAllActivity = () => {
  const [data, setData] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await GetAllActivity();
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
