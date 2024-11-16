import { useEffect, useState } from 'react';
import { 
    createConnection, 
    startConnection, 
    stopConnection, 
    sendSalesData, 
    onReceiveMessage, 
    offReceiveMessage, 
    onReceiveSalesData, 
    offReceiveSalesData 
} from '../services/signalRService';
import { SalesData } from '../types/SignalRType';

const useSalesData = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [salesData, setSalesData] = useState<SalesData | null>(null);

    useEffect(() => {
        createConnection();
        startConnection();

        onReceiveMessage((message: string) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        onReceiveSalesData((data: SalesData) => {
            console.log("Datos de ventas recibidos:", data); // Verificar qué datos llegan
            setSalesData(data);
        });

        return () => {
            offReceiveMessage();
            offReceiveSalesData();
            stopConnection();
        };
    }, []);

    const handleSendSalesData = async (data: SalesData) => {
        await sendSalesData(data);
    };

    return { messages, salesData, sendSalesData: handleSendSalesData };
};

export default useSalesData;
