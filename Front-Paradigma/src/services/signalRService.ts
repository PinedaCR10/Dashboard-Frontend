import * as signalR from '@microsoft/signalr';

export const HUB_URL = "https://localhost:7230/notifications";

export const createConnection = () => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(HUB_URL, {
            accessTokenFactory: () => localStorage.getItem('authToken') || ''
        })
        .withAutomaticReconnect()
        .build();
    return connection;
};

export const startConnection = async (connection: signalR.HubConnection) => {
    try {
        await connection.start();
        console.log("Conexión establecida con el hub de SignalR");
    } catch (err) {
        console.error("Error al conectar con SignalR:", err);
    }
};

export const stopConnection = async (connection: signalR.HubConnection) => {
    try {
        await connection.stop();
        console.log("Conexión detenida");
    } catch (err) {
        console.error("Error al detener la conexión de SignalR:", err);
    }
};
