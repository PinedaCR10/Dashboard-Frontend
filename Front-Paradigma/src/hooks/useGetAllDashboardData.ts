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

    // Datos simulados
    const simulatedData: DashboardData[] = [
        { id: '1', Costos: '2000', Usuarios: 'John', Producto: 'Laptop', Estado: true },
        { id: '2', Costos: '1500', Usuarios: 'Alice', Producto: 'Tablet', Estado: false },
        { id: '3', Costos: '3500', Usuarios: 'Bob', Producto: 'Smartphone', Estado: true },
        { id: '4', Costos: '500', Usuarios: 'Eve', Producto: 'Headphones', Estado: false },
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
        onReceiveDashboardData((dashboardData: DashboardData[]) => {
            console.log('Datos recibidos desde SignalR:', dashboardData);
            setData(dashboardData); // Establecer datos reales
            setLoading(false); // Finalizar estado de carga
            setError(null); // Limpiar errores
        });

        // Limpiar conexión al desmontar el componente
        return () => {
            clearTimeout(timeout); // Limpiar el timeout
            offReceiveDashboardData();
            stopConnection();
        };
    }, []);

    return { data, loading, error };
};
