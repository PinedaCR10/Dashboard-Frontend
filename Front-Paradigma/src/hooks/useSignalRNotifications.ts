import { useEffect, useState } from 'react';
import { 
    createConnection, 
    startConnection, 
    stopConnection, 
    sendMessage, 
    onReceiveMessage, 
    offReceiveMessage, 
    onReceiveSalesData, 
    offReceiveSalesData 
} from '../services/signalRService';

type SalesData = {
    id: number;
    producto: string;
    cantidad: number;
    precio: number;
    fecha: string;
};

const useChat = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [salesData, setSalesData] = useState<SalesData | null>(null);

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
        onReceiveSalesData((data: SalesData) => {
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

    // Función para enviar mensajes
    const handleSendMessage = async (message: string) => {
        await sendMessage(message);
    };

    return { messages, salesData, sendMessage: handleSendMessage };
};

export default useChat;
