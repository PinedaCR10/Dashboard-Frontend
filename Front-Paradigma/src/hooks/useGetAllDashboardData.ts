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
        createConnection();

        const startSignalRConnection = async () => {
            try {
                await startConnection();
                console.log('Conexión a SignalR iniciada para Dashboard');
                onReceiveDashboardData((dashboardData: DashboardData[]) => {
                    console.log('Datos recibidos desde SignalR para Dashboard:', dashboardData);
                    setData(dashboardData);
                    setLoading(false);
                });
            } catch (err) {
                console.error('Error al conectar con SignalR (Dashboard):', err);
                setError('Error al conectar con el servidor.');
                setLoading(false);
            }
        };

        startSignalRConnection();

        return () => {
            offReceiveDashboardData();
            stopConnection();
        };
    }, []);

    return { data, loading, error };
};
