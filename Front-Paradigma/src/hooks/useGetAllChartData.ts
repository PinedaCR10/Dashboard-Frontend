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
        onReceiveChartData((chartData: ChartData[]) => {
            setData(chartData);
            setLoading(false);
            setError(null); // Limpiar errores previos
        });

        // Limpiar conexión al desmontar el componente
        return () => {
            offReceiveChartData();
            stopConnection();
        };
    }, []);

    return { data, loading, error };
};
