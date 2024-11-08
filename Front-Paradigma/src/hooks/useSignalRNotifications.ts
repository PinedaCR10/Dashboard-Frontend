// hooks/useSignalRNotifications.ts
import { useEffect, useState } from 'react';
import { HubConnection } from '@microsoft/signalr';
import { createConnection, startConnection, stopConnection } from '../services/signalRService';

const useSignalRNotifications = (HUB_URL: string) => {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const connect = createConnection();
        setConnection(connect);

        startConnection(connect);

        return () => {
           
            stopConnection(connect);
        };
    }, []);

    useEffect(() => {
        if (connection) {
            connection.on("ReceiveNotification", (message: string) => {
                setMessages(prevMessages => [...prevMessages, message]);
            });
        }

        return () => {
            if (connection) {
                connection.off("ReceiveNotification");
            }
        };
    }, [connection]);

    return { messages };
};

export default useSignalRNotifications;
