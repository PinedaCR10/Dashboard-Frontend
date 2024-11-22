import { SimplifiedSalesData } from '../../types/SignalRType';

const formatCurrency = (price: number | undefined) => {
    if (typeof price === 'number') {
        return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(price);
    }
    return 'No disponible';
};

const formatDate = (dateString: string | undefined) => {
    if (dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('es-CR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    }
    return 'No disponible';
};

export const RecentActivity = ({
    salesData,
}: {
    salesData: {
        Products: SimplifiedSalesData[];
        AffiliateId: string;
        PurchaseDate: string;
        Amount: number;
        Status: number;
    } | null;
}) => {
    if (!salesData) {
        return <p className="text-gray-600 mt-4">No hay datos de ventas disponibles.</p>;
    }

    const { Products, AffiliateId, PurchaseDate, Amount, Status } = salesData;

    return (
        <div>
            <h2 className="text-xl font-bold mt-8 text-gray-800">Datos de Ventas en Tiempo Real</h2>
            <div className="py-6 bg-gray-100 rounded-lg shadow-md p-6">
                {/* Información General */}
                <div className="mb-4">
                    <p className="text-gray-800 font-semibold">
                        <strong>AffiliateId:</strong> {AffiliateId || 'No disponible'}
                    </p>
                    <p className="text-gray-800 font-semibold">
                        <strong>Fecha de Compra:</strong> {formatDate(PurchaseDate)}
                    </p>
                    <p className="text-gray-800 font-semibold">
                        <strong>Estado:</strong> {Status === 1 ? 'Activo' : 'Inactivo'}
                    </p>
                    <p className="text-gray-800 font-semibold">
                        <strong>Monto Total:</strong> {formatCurrency(Amount)}
                    </p>
                </div>

                {/* Lista de Productos */}
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Productos</h3>
                    {Array.isArray(Products) && Products.length > 0 ? (
                        Products.map((item, index) => (
                            <div
                                key={index}
                                className="mb-4 py-4 px-4 bg-white rounded-md shadow-sm border"
                            >
                                <p className="text-gray-800 font-semibold">
                                    <strong>Nombre del Producto:</strong> {item.Name || 'No disponible'}
                                </p>
                                <p className="text-gray-800 font-semibold">
                                    <strong>Descripción:</strong> {item.Description || 'No disponible'}
                                </p>
                                <p className="text-gray-800 font-semibold">
                                    <strong>Precio:</strong> {formatCurrency(item.Price)}
                                </p>
                                <p className="text-gray-800 font-semibold">
                                    <strong>AffiliateId:</strong> {item.AffiliateId || 'No disponible'}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No hay productos disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecentActivity;
