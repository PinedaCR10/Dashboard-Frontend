import { useEffect, useState } from 'react';
import { 
    createConnection, 
    startConnection, 
    stopConnection, 
    sendSalesData, // Cambiado para enviar datos de ventas específicamente
    onReceiveMessage, 
    offReceiveMessage, 
    onReceiveSalesData, 
    offReceiveSalesData 
} from '../services/signalRService';
import { SimplifiedSalesData } from '../types/SignalRType';

const useSalesData = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [salesData, setSalesData] = useState<SimplifiedSalesData | null>(null);

    useEffect(() => {
        // Crear y configurar la conexión
        createConnection();

        // Iniciar la conexión
        startConnection();

        // Escuchar el evento "ReceiveMessage" para mensajes de chat
        onReceiveMessage((message: string) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        // Escuchar el evento "ReceiveSalesData" para recibir datos de ventas
        onReceiveSalesData((data: SimplifiedSalesData) => {
            setSalesData(data);
            console.log("Datos de ventas recibidos:", data);
        });

        // Limpiar la conexión al desmontar el componente
        return () => {
            offReceiveMessage();
            offReceiveSalesData();
            stopConnection();
        };
    }, []);

    // Función para enviar datos de ventas
    const handleSendSalesData = async (data: SimplifiedSalesData) => {
        await sendSalesData(data);
    };

    return { messages, salesData, sendSalesData: handleSendSalesData };
};

export default useSalesData;
