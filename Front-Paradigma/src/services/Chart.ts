import * as signalR from '@microsoft/signalr';
import { ChartData } from '../types/ChartType';

let connection: signalR.HubConnection | null = null;

/**
 * Crea una conexión de SignalR con el backend.
 */
export const createConnection = () => {
    const signalRUrl = import.meta.env.VITE_API_SIGNALR_URL;
    connection = new signalR.HubConnectionBuilder()
        .withUrl(`${signalRUrl}/hub/ChartHub`, { withCredentials: true })
        .withAutomaticReconnect()
        .build();
    return connection;
};

/**
 * Inicia la conexión de SignalR.
 */
export const startConnection = async () => {
    if (connection) {
        try {
            await connection.start();
            console.log("Conectado a SignalR (ChartHub)");
        } catch (err) {
            console.error("Error al conectar con SignalR (ChartHub):", err);
        }
    } else {
        console.warn("No se pudo iniciar la conexión: connection es null.");
    }
};

/**
 * Detiene la conexión de SignalR.
 */
export const stopConnection = async () => {
    if (connection) {
        try {
            await connection.stop();
            console.log("Conexión detenida (ChartHub)");
        } catch (err) {
            console.error("Error al detener la conexión de SignalR (ChartHub):", err);
        }
    }
};

/**
 * Suscribe una función callback para recibir datos del Chart desde SignalR.
 */
export const onReceiveChartData = (callback: (data: ChartData[]) => void) => {
    if (connection) {
        connection.on("ReceiveChartData", (data: string) => {
            console.log("Datos de Chart recibidos (serializados):", data);
            const parsedData: ChartData[] = JSON.parse(data); // Deserializa el string JSON
            callback(parsedData);
        });
    } else {
        console.warn("No se pudo suscribir a 'ReceiveChartData': conexión no está establecida.");
    }
};

/**
 * Cancela la suscripción a los datos del Chart desde SignalR.
 */
export const offReceiveChartData = () => {
    if (connection) {
        connection.off("ReceiveChartData");
    } else {
        console.warn("No se pudo cancelar la suscripción de 'ReceiveChartData': conexión no está establecida.");
    }
};
