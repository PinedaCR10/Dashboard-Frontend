import { FaUser, FaBox, FaCalendarAlt, FaClock } from 'react-icons/fa';
import useSalesData from "../../hooks/useSignalRNotifications";

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
              <p className="text-gray-800 font-semibold"><strong>ID:</strong> {salesData.Id}</p>
              <p className="text-gray-800 font-semibold"><strong>AffiliateId:</strong> {salesData.Id}</p>
              <p className="text-gray-600 flex items-center mt-1">
                <FaBox className="mr-2 text-blue-500" /> 
                <span><strong>Product:</strong> {salesData.Producto}</span>
              </p>
              <p className="text-gray-600 flex items-center mt-1">
                <FaCalendarAlt className="mr-2 text-green-500" /> 
                <span><strong>Date:</strong> {new Date(salesData.Fecha).toLocaleDateString()}</span>
              </p>
              <p className="text-gray-600 flex items-center mt-1">
                <FaClock className="mr-2 text-purple-500" /> 
                <span><strong>Hour:</strong> {new Date(salesData.Fecha).toLocaleTimeString()}</span>
              </p>
              <p className="text-gray-600 flex items-center mt-1">
                <FaBox className="mr-2 text-red-500" /> 
                <span><strong>Price:</strong> ${salesData.Precio}</span>
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 mt-4">No hay datos de ventas disponibles</p>
        )}
      </div>
  );
};

export default RecentActivity;
