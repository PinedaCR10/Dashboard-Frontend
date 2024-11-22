import { useEffect, useState } from 'react';
import { ChartData } from '../types/ChartType';
import {
    createConnection,
    startConnection,
    stopConnection,
    onReceiveChartData,
    offReceiveChartData,
} from '../services/Chart';

export const useGetAllChartData = () => {
    const [data, setData] = useState<ChartData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        createConnection();

        const startSignalRConnection = async () => {
            try {
                await startConnection();
                console.log('Conexión a SignalR iniciada para Charts');
                onReceiveChartData((chartData: ChartData[]) => {
                    console.log('Datos recibidos desde SignalR para Charts:', chartData);
                    setData(chartData);
                    setLoading(false);
                });
            } catch (err) {
                console.error('Error al conectar con SignalR (Charts):', err);
                setError('Error al conectar con el servidor.');
                setLoading(false);
            }
        };

        startSignalRConnection();

        return () => {
            offReceiveChartData();
            stopConnection();
        };
    }, []);

    return { data, loading, error };
};
