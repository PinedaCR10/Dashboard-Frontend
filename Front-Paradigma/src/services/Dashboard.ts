import * as signalR from '@microsoft/signalr';
import { DashboardData } from '../types/DashboardType';

let connection: signalR.HubConnection | null = null;

/**
 * Crea una conexión de SignalR con el backend.
 */
export const createConnection = () => {
    const signalRUrl = import.meta.env.VITE_API_SIGNALR_URL;
    connection = new signalR.HubConnectionBuilder()
        .withUrl(`${signalRUrl}/hub/DashboardHub`, { withCredentials: true })
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
            console.log("Conectado a SignalR (DashboardHub)");
        } catch (err) {
            console.error("Error al conectar con SignalR (DashboardHub):", err);
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
            console.log("Conexión detenida (DashboardHub)");
        } catch (err) {
            console.error("Error al detener la conexión de SignalR (DashboardHub):", err);
        }
    }
};

/**
 * Suscribe una función callback para recibir datos del Dashboard desde SignalR.
 */
export const onReceiveDashboardData = (callback: (data: DashboardData[]) => void) => {
    if (connection) {
        connection.on("ReceiveDashboardData", (data: string) => {
            console.log("Datos del Dashboard recibidos (serializados):", data);
            const parsedData: DashboardData[] = JSON.parse(data); // Deserializa el string JSON
            callback(parsedData);
        });
    } else {
        console.warn("No se pudo suscribir a 'ReceiveDashboardData': conexión no está establecida.");
    }
};

/**
 * Cancela la suscripción a los datos del Dashboard desde SignalR.
 */
export const offReceiveDashboardData = () => {
    if (connection) {
        connection.off("ReceiveDashboardData");
    } else {
        console.warn("No se pudo cancelar la suscripción de 'ReceiveDashboardData': conexión no está establecida.");
    }
};
