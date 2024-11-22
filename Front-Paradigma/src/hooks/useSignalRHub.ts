/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import {
    createConnection,
    startConnection,
    stopConnection,
    onReceiveSalesData,
    offReceiveSalesData,
} from '../services/signalRService';

const useSalesData = () => {
    const [salesData, setSalesData] = useState<any>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const connection = createConnection();

        startConnection()
            .then(() => {
                console.log('Conexión establecida');
                setIsConnected(true);
            })
            .catch((err) => {
                console.error('Error al conectar con SignalR:', err);
                setIsConnected(false);
            });

        onReceiveSalesData((data) => {
            setSalesData(data); // Ahora se espera que data ya tenga la estructura correcta
        });

        return () => {
            offReceiveSalesData();
            stopConnection()
                .then(() => {
                    console.log('Conexión cerrada');
                    setIsConnected(false);
                })
                .catch((err) => console.error('Error al detener conexión:', err));
        };
    }, []);

    return { salesData, isConnected };
};

export default useSalesData;
