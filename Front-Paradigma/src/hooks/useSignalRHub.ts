import { useEffect, useState } from 'react';
import {
    startConnection,
    stopConnection,
    sendSalesData,
    onReceiveSalesData,
    offReceiveSalesData,
} from '../services/signalRService';
import { SalesData } from '../types/SignalRType';

const useSalesData = () => {
    const [salesData, setSalesData] = useState<SalesData | null>(null);

    useEffect(() => {
        // Inicia la conexión de SignalR
        startConnection();

        // Suscribe la recepción de datos
        onReceiveSalesData((data: SalesData) => {
            console.log('Datos de ventas recibidos:', data);
            setSalesData(data);
        });

        // Cleanup al desmontar el componente
        return () => {
            offReceiveSalesData();
            stopConnection();
        };
    }, []); // El efecto se ejecuta una vez al montar

    const handleSendSalesData = async (data: SalesData) => {
        await sendSalesData(data);
    };

    return { salesData, sendSalesData: handleSendSalesData };
};

export default useSalesData;
