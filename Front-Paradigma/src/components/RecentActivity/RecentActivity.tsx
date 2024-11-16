import { SalesData } from '../../types/SignalRType';
import { FaUser, FaBox } from 'react-icons/fa';

export const RecentActivity = ({ salesData }: { salesData: SalesData | null }) => {
    console.log('Datos en RecentActivity:', salesData);

    return (
        <div>
            <h2 className="text-xl font-bold mt-8 text-gray-800">Datos de Ventas en Tiempo Real</h2>
            {salesData ? (
                <div className="py-4 flex space-x-4 items-center mt-4 bg-gray-100 rounded-lg shadow-md p-4">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-500 shadow-md">
                        <FaUser className="text-xl" />
                    </div>
                    <div className="flex-1">
                        <p className="text-gray-800 font-semibold"><strong>AffiliateId:</strong> {salesData.AffiliateId}</p>
                        <p className="text-gray-800 font-semibold"><strong>CardId:</strong> {salesData.CardId}</p>
                        <p className="text-gray-800 font-semibold"><strong>ProductId:</strong> {salesData.ProductId}</p>

                        {salesData.Product ? (
                            <>
                                <h3 className="text-lg font-bold mt-4 text-gray-700">Producto</h3>
                                <p className="text-gray-600 flex items-center mt-1">
                                    <FaBox className="mr-2 text-blue-500" /> <span><strong>Name:</strong> {salesData.Product.Name}</span>
                                </p>
                                <p className="text-gray-600 flex items-center mt-1">
                                    <FaBox className="mr-2 text-red-500" /> <span><strong>Description:</strong> {salesData.Product.Description}</span>
                                </p>
                                <p className="text-gray-600 flex items-center mt-1">
                                    <FaBox className="mr-2 text-green-500" /> <span><strong>Price:</strong> ${salesData.Product.Price.toFixed(2)}</span>
                                </p>
                            </>
                        ) : (
                            <p className="text-gray-600 mt-4">Información de producto no disponible</p>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-gray-600 mt-4">No hay datos de ventas disponibles</p>
            )}
        </div>
    );
};
