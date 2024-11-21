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

    // Datos simulados
    const simulatedData: ChartData[] = [
        { id: '1', Costos: '1200', Usuarios: 'Alice', Producto: 'Tablet', Estado: true },
        { id: '2', Costos: '3000', Usuarios: 'Bob', Producto: 'Smartphone', Estado: false },
        { id: '3', Costos: '1500', Usuarios: 'Eve', Producto: 'Headphones', Estado: true },
        { id: '4', Costos: '2500', Usuarios: 'John', Producto: 'Laptop', Estado: false },
    ];

    useEffect(() => {
        // Crear y configurar la conexión
        createConnection();

        // Timeout para datos simulados si SignalR no responde
        const timeout = setTimeout(() => {
            if (loading) {
                console.warn('No se pudo conectar a SignalR, cargando datos simulados...');
                setData(simulatedData); // Establecer datos simulados
                setLoading(false); // Finalizar estado de carga
                setError(null); // Simular éxito
            }
        }, 5000); // Esperar 5 segundos antes de usar datos simulados

        const startSignalRConnection = async () => {
            try {
                await startConnection();
                console.log('Conexión a SignalR iniciada correctamente');
            } catch (err) {
                setError('Error al iniciar la conexión con SignalR');
                console.error('Error de conexión:', err);
            }
        };

        startSignalRConnection();

        // Escuchar datos del backend en tiempo real
        onReceiveChartData((chartData: ChartData[]) => {
            console.log('Datos recibidos desde SignalR:', chartData);
            setData(chartData); // Establecer datos reales
            setLoading(false); // Finalizar estado de carga
            setError(null); // Limpiar errores
        });

        // Limpiar conexión al desmontar el componente
        return () => {
            clearTimeout(timeout); // Limpiar el timeout
            offReceiveChartData();
            stopConnection();
        };
    }, []);

    return { data, loading, error };
};
