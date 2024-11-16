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
        if (import.meta.env.MODE === 'development') {
            // Simula datos en modo desarrollo
            const mockData: SalesData = {
                Id: "1",
                ProductId: "101",
                AffiliateId: "201",
                CardId: "301",
                Product: {
                    Id: "101",
                    Name: "Producto Prueba",
                    Description: "Descripción de prueba",
                    Price: 99.99,
                    Category: "Categoría Prueba",
                    Stock: 10,
                    AffiliateId: "201",
                },
            };

            setTimeout(() => {
                console.log("Datos de prueba asignados a salesData.");
                setSalesData(mockData);
            }, 3000); // Simula un retraso de 3 segundos
        } else {
            // Comportamiento real para SignalR
            startConnection();

            onReceiveSalesData((data: SalesData) => {
                console.log('Datos de ventas recibidos:', data);
                setSalesData(data);
            });

            return () => {
                offReceiveSalesData();
                stopConnection();
            };
        }
    }, []);

    const handleSendSalesData = async (data: SalesData) => {
        await sendSalesData(data);
    };

    return { salesData, sendSalesData: handleSendSalesData };
};

export default useSalesData;
