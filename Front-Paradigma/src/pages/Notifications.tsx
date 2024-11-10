// pages/Notifications.tsx
import React from 'react';
import useSignalRNotifications from '../hooks/useSignalRNotifications';
import { HUB_URL } from '../services/signalRService';

const Notifications: React.FC = () => {
    const { messages } = useSignalRNotifications(HUB_URL);

    return (
        <div>
            <h1>Notificaciones del Dashbard</h1>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
