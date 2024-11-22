/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as signalR from '@microsoft/signalr';
import { SimplifiedSalesData } from '../types/SignalRType';

let connection: signalR.HubConnection | null = null;

export const createConnection = () => {
    const signalRUrl = import.meta.env.VITE_API_SIGNALR_URL;
    connection = new signalR.HubConnectionBuilder()
        .withUrl(`${signalRUrl}/hub/Saleshub`, { withCredentials: true })
        .withAutomaticReconnect()
        .build();
    return connection;
};

export const startConnection = async () => {
    if (connection) {
        try {
            await connection.start();
            console.log('Conectado a SignalR');
        } catch (err) {
            console.error('Error al conectar con SignalR:', err);
        }
    }
};

export const stopConnection = async () => {
    if (connection) {
        try {
            await connection.stop();
            console.log('Conexión detenida');
        } catch (err) {
            console.error('Error al detener la conexión:', err);
        }
    }
};

export const onReceiveSalesData = (callback: (data: any) => void) => {
    if (connection) {
        connection.on('ReceiveSalesData', (data: string) => {
            console.log('Datos de ventas recibidos:', data);
            try {
                const parsedData = JSON.parse(data); // Supongamos que data es un JSON string
                // Aseguramos la estructura esperada por el componente
                const transformedData = {
                    Products: parsedData, // Los datos en el array son los productos
                    AffiliateId: parsedData[0]?.AffiliateId || 'No disponible',
                    PurchaseDate: parsedData[0]?.PurchaseDate || 'No disponible',
                    Amount: parsedData[0]?.Amount || 0,
                    Status: 1, // Puedes ajustar este valor según sea necesario
                };
                callback(transformedData);
            } catch (err) {
                console.error('Error al parsear datos de ventas:', err);
            }
        });
    }
};


export const offReceiveSalesData = () => {
    if (connection) {
        connection.off('ReceiveSalesData');
    }
};
