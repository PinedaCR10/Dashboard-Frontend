import { useEffect, useState } from 'react';
import { DashboardData } from '../types/DashboardType';
import {
    createConnection,
    startConnection,
    stopConnection,
    onReceiveDashboardData,
    offReceiveDashboardData,
} from '../services/Dashboard';

export const useGetAllDashboardData = () => {
    const [data, setData] = useState<DashboardData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Crear y configurar la conexión
        createConnection();

        // Manejo de la conexión
        const startSignalRConnection = async () => {
            try {
                await startConnection();
                console.log('Conexión iniciada correctamente');
            } catch (err) {
                setError('Error al iniciar la conexión');
                console.error('Error de conexión:', err);
            }
        };

        startSignalRConnection();

        // Escuchar los datos en tiempo real
        onReceiveDashboardData((dashboardData: DashboardData[]) => {
            setData(dashboardData);
            setLoading(false);
            setError(null); // Limpiar errores previos
        });

        // Limpiar conexión al desmontar el componente
        return () => {
            offReceiveDashboardData();
            stopConnection();
        };
    }, []);

    return { data, loading, error };
};
