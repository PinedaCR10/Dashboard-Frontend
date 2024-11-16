import * as signalR from '@microsoft/signalr';
import { SalesData } from '../types/SignalRType';

let connection: signalR.HubConnection | null = null;

/**
 * Obtiene o crea una instancia única de conexión SignalR.
 */
export const getConnection = () => {
    if (!connection) {
        const signalRUrl = import.meta.env.VITE_API_SIGNALR_URL;
        connection = new signalR.HubConnectionBuilder()
            .withUrl(`${signalRUrl}/hub/Saleshub`, {
                withCredentials: true,
            })
            .withAutomaticReconnect()
            .build();
    }
    return connection;
};

/**
 * Inicia la conexión SignalR.
 */
export const startConnection = async () => {
    const conn = getConnection();
    if (conn) {
        try {
            await conn.start();
            console.log('Conectado a SignalR SalesHub');
        } catch (err) {
            console.error('Error al conectar con SignalR:', err);
        }
    } else {
        console.warn('Conexión no iniciada: conexión es null.');
    }
};

/**
 * Detiene la conexión SignalR.
 */
export const stopConnection = async () => {
    if (connection) {
        try {
            await connection.stop();
            console.log('Conexión detenida');
        } catch (err) {
            console.error('Error al detener la conexión de SignalR:', err);
        }
    }
};

/**
 * Envía datos de ventas al backend.
 * @param salesData Datos de ventas que se enviarán al backend.
 */
export const sendSalesData = async (salesData: SalesData) => {
    if (connection?.state === signalR.HubConnectionState.Connected) {
        try {
            await connection.invoke('SendSalesData', salesData);
        } catch (err) {
            console.error('Error al enviar datos de ventas:', err);
        }
    } else {
        console.warn('No se pudo enviar datos de ventas: conexión no establecida.');
    }
};

/**
 * Suscribe una función callback para recibir datos de ventas.
 * @param callback Función que se ejecutará al recibir datos de ventas.
 */
export const onReceiveSalesData = (callback: (data: SalesData) => void) => {
    const conn = getConnection();
    if (conn) {
        conn.on('ReceiveSalesData', callback);
    } else {
        console.warn('No se pudo suscribir a ReceiveSalesData: conexión no establecida.');
    }
};

/**
 * Cancela la suscripción a datos de ventas.
 */
export const offReceiveSalesData = () => {
    if (connection) {
        connection.off('ReceiveSalesData');
    } else {
        console.warn('No se pudo cancelar la suscripción de ReceiveSalesData: conexión no establecida.');
    }
};
