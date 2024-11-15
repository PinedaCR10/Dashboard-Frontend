import { FaUser, FaBox } from 'react-icons/fa';
import useSalesData from '../../hooks/useSignalRNotifications';

const RecentActivity = () => {

  const { salesData } = useSalesData();

  return (
    <div>
      <h2 className="text-xl font-bold mt-8 text-gray-800">Datos de Ventas en Tiempo Real</h2>
      {salesData ? (
        <div className="py-4 flex space-x-4 items-center mt-4 bg-gray-100 rounded-lg shadow-md p-4">
          <div className="p-3 rounded-full bg-blue-100 text-blue-500 shadow-md">
            <FaUser className="text-xl" />
          </div>
          <div className="flex-1">
            <p className="text-gray-800 font-semibold"><strong>AffiliateId:</strong> {salesData.AffiliateId || "No disponible"}</p>
            <p className="text-gray-800 font-semibold"><strong>CardId:</strong> {salesData.CardId || "No disponible"}</p>
            <p className="text-gray-800 font-semibold"><strong>ProductId:</strong> {salesData.ProductId || "No disponible"}</p>

            {salesData.Product ? (
              <>
                <h3 className="text-lg font-bold mt-4 text-gray-700">Producto</h3>
                <p className="text-gray-600 flex items-center mt-1">
                  <FaBox className="mr-2 text-blue-500" /> 
                  <span><strong>Product Name:</strong> {salesData.Product.Name || "No disponible"}</span>
                </p>
                <p className="text-gray-600 flex items-center mt-1">
                  <FaBox className="mr-2 text-red-500" /> 
                  <span><strong>Description:</strong> {salesData.Product.Description || "No disponible"}</span>
                </p>
                <p className="text-gray-600 flex items-center mt-1">
                  <FaBox className="mr-2 text-green-500" /> 
                  <span><strong>Price:</strong> ${salesData.Product.Price ? salesData.Product.Price.toFixed(2) : "No disponible"}</span>
                </p>
                <p className="text-gray-600 flex items-center mt-1">
                  <FaBox className="mr-2 text-yellow-500" /> 
                  <span><strong>Category:</strong> {salesData.Product.Category || "No disponible"}</span>
                </p>
                <p className="text-gray-600 flex items-center mt-1">
                  <FaBox className="mr-2 text-purple-500" /> 
                  <span><strong>Stock:</strong> {salesData.Product.Stock || "No disponible"}</span>
                </p>
                <p className="text-gray-600 flex items-center mt-1">
                  <FaBox className="mr-2 text-indigo-500" /> 
                  <span><strong>Product AffiliateId:</strong> {salesData.Product.AffiliateId || "No disponible"}</span>
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

export default RecentActivity;
