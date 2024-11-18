import { useEffect, useState } from 'react';
import { createConnection, startConnection, stopConnection, onReceiveSalesData, offReceiveSalesData } from '../services/signalRService';
import { SimplifiedSalesData } from '../types/SignalRType';

const useSalesData = () => {
    const [salesData, setSalesData] = useState<SimplifiedSalesData | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        createConnection();
        startConnection()
            .then(() => {
                console.log("Conexión establecida con SignalR.");
                setIsConnected(true);
            })
            .catch((err) => {
                console.error("Error al conectar con SignalR:", err);
                setIsConnected(false);
            });

        onReceiveSalesData((data: SimplifiedSalesData) => {
            console.log("Datos de ventas recibidos:", data);
            setSalesData(data);
        });

        return () => {
            offReceiveSalesData();
            stopConnection()
                .then(() => console.log("Conexión de SignalR detenida."))
                .catch((err) => console.error("Error al detener la conexión:", err));
        };
    }, []);

    return { salesData, isConnected };
};

export default useSalesData;
