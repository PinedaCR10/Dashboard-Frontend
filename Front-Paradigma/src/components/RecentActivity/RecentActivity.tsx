import DataStatus from "../../error/error";
import { useGetAllActivity } from "../../hooks/useGetAllActivity";
import { FaUser, FaBox, FaCalendarAlt, FaClock, FaClipboardList } from 'react-icons/fa';
import useChat from '../../hooks/useSignalRNotifications';

const RecentActivity = () => {
  const { data, loading, error } = useGetAllActivity();
  const { salesData } = useChat(); // Agregar el hook `useChat` para obtener `salesData`

  return (
    <DataStatus loading={loading} error={error} data={data}>
      <div>
        <h2 className="text-xl font-bold mt-8 text-gray-800">Datos de Ventas en Tiempo Real</h2>
        {salesData ? (
          <div className="py-4 flex space-x-4 items-center mt-4 bg-gray-100 rounded-lg shadow-md p-4">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500 shadow-md">
              <FaUser className="text-xl" />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-semibold"><strong>ID:</strong> {salesData.id}</p>
              <p className="text-gray-600 flex items-center mt-1">
                <FaBox className="mr-2 text-blue-500" /> 
                <span><strong>Producto:</strong> {salesData.producto}</span>
              </p>
              <p className="text-gray-600 flex items-center mt-1">
                <FaClipboardList className="mr-2 text-yellow-500" /> 
                <span><strong>Cantidad:</strong> {salesData.cantidad}</span>
              </p>
              <p className="text-gray-600 flex items-center mt-1">
                <FaCalendarAlt className="mr-2 text-green-500" /> 
                <span><strong>Fecha:</strong> {new Date(salesData.fecha).toLocaleDateString()}</span>
              </p>
              <p className="text-gray-600 flex items-center mt-1">
                <FaClock className="mr-2 text-purple-500" /> 
                <span><strong>Hora:</strong> {new Date(salesData.fecha).toLocaleTimeString()}</span>
              </p>
              <p className="text-gray-600 flex items-center mt-1">
                <FaBox className="mr-2 text-red-500" /> 
                <span><strong>Precio:</strong> {salesData.precio}</span>
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 mt-4">No hay datos de ventas disponibles</p>
        )}
      </div>
    </DataStatus>
  );
};

export default RecentActivity;
