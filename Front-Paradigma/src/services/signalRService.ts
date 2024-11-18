import * as signalR from '@microsoft/signalr';
import { SimplifiedSalesData } from '../types/SignalRType';

let connection: signalR.HubConnection | null = null;

/**
 * Crea una conexión de SignalR con el backend.
 */
export const createConnection = () => {
    const signalRUrl = import.meta.env.VITE_API_SIGNALR_URL;
    connection = new signalR.HubConnectionBuilder()
        .withUrl(`${signalRUrl}/hub/Saleshub`, { withCredentials: true })
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
            console.log("Conectado a SignalR");
        } catch (err) {
            console.error("Error al conectar con SignalR:", err);
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
            console.log("Conexión detenida");
        } catch (err) {
            console.error("Error al detener la conexión de SignalR:", err);
        }
    }
};

/**
 * Suscribe una función callback para recibir datos de ventas desde SignalR.
 */
export const onReceiveSalesData = (callback: (data: SimplifiedSalesData) => void) => {
    if (connection) {
        connection.on("ReceiveSalesData", (data: string) => {
            console.log("Datos de ventas recibidos (serializados):", data);
            const parsedData: SimplifiedSalesData = JSON.parse(data); // Deserializa el string JSON
            callback(parsedData);
        });
    } else {
        console.warn("No se pudo suscribir a 'ReceiveSalesData': conexión no está establecida.");
    }
};

/**
 * Cancela la suscripción a los datos de ventas desde SignalR.
 */
export const offReceiveSalesData = () => {
    if (connection) {
        connection.off("ReceiveSalesData");
    } else {
        console.warn("No se pudo cancelar la suscripción de 'ReceiveSalesData': conexión no está establecida.");
    }
};
