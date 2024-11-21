import * as signalR from '@microsoft/signalr';
import { DashboardData } from '../types/DashboardType';

let connection: signalR.HubConnection | null = null;

/**
 * Configura y crea la conexión SignalR.
 */
export const createConnection = () => {
    connection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7230/hub/DashboardHub') // Ajusta la URL a tu backend
        .withAutomaticReconnect()
        .build();
    return connection;
};

/**
 * Inicia la conexión SignalR.
 */
export const startConnection = async () => {
    if (connection) {
        try {
            await connection.start();
            console.log('Conexión a DashboardHub iniciada');
        } catch (err) {
            console.error('Error al conectar a SignalR:', err);
        }
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
            console.error('Error al detener la conexión:', err);
        }
    }
};

/**
 * Escucha eventos de datos del Dashboard.
 * @param callback Función que maneja los datos recibidos.
 */
export const onReceiveDashboardData = (callback: (data: DashboardData[]) => void) => {
    if (connection) {
        connection.on('ReceiveDashboardData', callback);
    }
};

/**
 * Detiene la escucha de eventos de datos del Dashboard.
 */
export const offReceiveDashboardData = () => {
    if (connection) {
        connection.off('ReceiveDashboardData');
    }
};
