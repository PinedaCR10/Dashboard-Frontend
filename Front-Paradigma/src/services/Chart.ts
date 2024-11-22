import * as signalR from '@microsoft/signalr';
import { ChartData } from '../types/ChartType';

let connection: signalR.HubConnection | null = null;

/**
 * Crea la conexión al SalesHub.
 */
export const createConnection = () => {
    const signalRUrl = import.meta.env.VITE_API_SIGNALR_URL;
    connection = new signalR.HubConnectionBuilder()
        .withUrl(`${signalRUrl}/hub/Saleshub`, { withCredentials: true })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Debug) // Habilitar logs detallados
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
            console.log("Conectado a SignalR (SalesHub para Charts)");
        } catch (err) {
            console.error("Error al conectar con SignalR (SalesHub para Charts):", err);
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
            console.log("Conexión detenida (SalesHub para Charts)");
        } catch (err) {
            console.error("Error al detener la conexión de SignalR (SalesHub para Charts):", err);
        }
    }
};

/**
 * Suscribe una función callback para recibir datos del Chart desde SignalR.
 */
export const onReceiveChartData = (callback: (data: ChartData[]) => void) => {
    if (connection) {
        connection.on("ReceiveSalesData", (data: string) => { // Evento correcto
            console.log("Datos de Chart recibidos (serializados):", data);
            const parsedData: ChartData[] = JSON.parse(data); // Deserializa el string JSON
            callback(parsedData);
        });
    } else {
        console.warn("No se pudo suscribir a 'ReceiveSalesData': conexión no está establecida.");
    }
};

/**
 * Cancela la suscripción a los datos del Chart desde SignalR.
 */
export const offReceiveChartData = () => {
    if (connection) {
        connection.off("ReceiveSalesData");
    } else {
        console.warn("No se pudo cancelar la suscripción de 'ReceiveSalesData': conexión no está establecida.");
    }
};
