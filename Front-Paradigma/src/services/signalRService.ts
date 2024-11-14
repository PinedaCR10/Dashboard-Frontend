    import * as signalR from '@microsoft/signalr';
    import { SalesData } from '../types/SignalRType'; 

    let connection: signalR.HubConnection | null = null;

    export const createConnection = () => {
        const signalRUrl = import.meta.env.VITE_API_SIGNALR_URL;
        connection = new signalR.HubConnectionBuilder()
            .withUrl(`${signalRUrl}/hub/Saleshub`, {
                withCredentials: true // Agrega esta opción si necesitas enviar cookies o autenticación
            })
            .withAutomaticReconnect() // Reconexión automática en caso de pérdida de conexión
            .build();
        return connection;
    };

    export const startConnection = async () => {
        if (connection) {
            try {
                await connection.start();
                console.log("Conectado a SalesHub");
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

    /**
     * Envía datos de ventas al backend.
     * @param salesData Los datos de ventas que se enviarán al backend.
     */
    export const sendSalesData = async (salesData: SalesData) => {
        if (connection) {
            try {
                await connection.invoke("SendSalesData", salesData); // Asegúrate de que "SendSalesData" esté en tu Hub backend
            } catch (err) {
                console.error("Error al enviar datos de ventas:", err);
            }
        }
    };

    /**
     * Suscribe una función callback para recibir datos de ventas desde SignalR.
     * @param callback Función que se ejecutará cuando se reciba un mensaje de datos de ventas.
     */
    export const onReceiveSalesData = (callback: (data: SalesData) => void) => {
        if (connection) {
            connection.on("ReceiveSalesData", callback);
        }
    };

    export const offReceiveSalesData = () => {
        if (connection) {
            connection.off("ReceiveSalesData");
        }
    };

    /**
     * Suscribe una función callback para recibir mensajes genéricos desde SignalR.
     * @param callback Función que se ejecutará cuando se reciba un mensaje.
     */
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
