// BasicSalesDataDisplay.tsx

import useSalesData from '../hooks/useSignalRNotifications';

const BasicSalesDataDisplay = () => {
    const { salesData } = useSalesData(); // Usamos el hook para obtener salesData

    return (
        <div style={{ padding: '20px', border: '1px solid black', borderRadius: '8px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Datos de Ventas en Tiempo Real</h2>
            {salesData ? (
                <div>
                    <p><strong>AffiliateId:</strong> {salesData.AffiliateId}</p>
                    <p><strong>CardId:</strong> {salesData.CardId}</p>
                    <p><strong>ProductId:</strong> {salesData.ProductId}</p>

                    {salesData.Product ? (
                        <div style={{ marginTop: '10px' }}>
                            <h3>Producto</h3>
                            <p><strong>Product Name:</strong> {salesData.Product.Name}</p>
                            <p><strong>Description:</strong> {salesData.Product.Description}</p>
                            <p><strong>Price:</strong> ${salesData.Product.Price}</p>
                            <p><strong>Category:</strong> {salesData.Product.Category}</p>
                            <p><strong>Stock:</strong> {salesData.Product.Stock}</p>
                            <p><strong>Product AffiliateId:</strong> {salesData.Product.AffiliateId}</p>
                        </div>
                    ) : (
                        <p>Información de producto no disponible</p>
                    )}
                </div>
            ) : (
                <p>No hay datos de ventas disponibles</p>
            )}
        </div>
    );
};

export default BasicSalesDataDisplay;
