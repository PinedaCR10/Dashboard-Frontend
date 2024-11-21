import * as signalR from '@microsoft/signalr';
import { ChartData } from '../types/ChartType';

let connection: signalR.HubConnection | null = null;

/**
 * Configura y crea la conexión SignalR.
 */
export const createConnection = () => {
    connection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7230/hub/ChartHub') // Asegúrate de que coincida con el backend
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
            console.log('Conexión a ChartHub iniciada');
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
 * Escucha eventos de datos del Chart.
 * @param callback Función que maneja los datos recibidos.
 */
export const onReceiveChartData = (callback: (data: ChartData[]) => void) => {
    if (connection) {
        connection.on('ReceiveChartData', callback);
    }
};

/**
 * Detiene la escucha de eventos de datos del Chart.
 */
export const offReceiveChartData = () => {
    if (connection) {
        connection.off('ReceiveChartData');
    }
};
