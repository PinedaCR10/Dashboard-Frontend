import { useState, useEffect } from 'react';
import { RecentActivity } from '../RecentActivity/RecentActivity';
import { SalesData } from '../../types/SignalRType';

export const NavigationPanel = () => {
    const [salesData, setSalesData] = useState<SalesData | null>(null);

    useEffect(() => {
        const mockData: SalesData = {
            Id: "1",
            ProductId: "101",
            AffiliateId: "201",
            CardId: "301",
            Product: {
                Id: "101",
                Name: "Producto Prueba",
                Description: "Descripción de prueba",
                Price: 99.99,
                Category: "Categoría Prueba",
                Stock: 10,
                AffiliateId: "201",
            },
        };

        setTimeout(() => {
            console.log("Datos de prueba asignados a salesData.");
            setSalesData(mockData);
        }, 3000); // Simula un retraso de 3 segundos
    }, []);

    return (
        <div>
            <h1>Simulación de Actividad</h1>
            <RecentActivity salesData={salesData} />
        </div>
    );
};
