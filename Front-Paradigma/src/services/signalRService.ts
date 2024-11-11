
import * as signalR from '@microsoft/signalr';

let connection: signalR.HubConnection | null = null;

export const createConnection = () => {
    connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7230/hub/Saleshub") // Asegúrate de que coincida con el nombre del hub en el backend
        .withAutomaticReconnect()
        .build();
    return connection;
};

export const startConnection = async () => {
    if (connection) {
        try {
            await connection.start();
            console.log("Conectado a NotificationHub");
        } catch (err) {
            console.error("Error de conexión a SignalR:", err);
        }
    }
};

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

// Cambiar a enviar datos de ventas si es necesario
export const sendMessage = async (message: string) => {
    if (connection) {
        try {
            await connection.invoke("SendMessage", message);
        } catch (err) {
            console.error("Error al enviar mensaje:", err);
        }
    }
};

export const onReceiveMessage = (callback: (message: string) => void) => {
    if (connection) {
        connection.on("ReceiveMessage", callback);
    }
};

export const offReceiveMessage = () => {
    if (connection) {
        connection.off("ReceiveMessage");
    }
};


export const onReceiveSalesData = (callback: (data: any) => void) => {
    if (connection) {
        connection.on("ReceiveSalesData", callback);
    }
};

export const offReceiveSalesData = () => {
    if (connection) {
        connection.off("ReceiveSalesData");
    }
};
