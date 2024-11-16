import { useEffect } from 'react';
import { FaShoppingCart, FaUser, FaDollarSign, FaCheckCircle } from 'react-icons/fa';
import { useGetAllSummary } from '../../hooks/useGetAllSummary';
import DataStatus from '../../error/error';
import useSignalRNotifications from '../../hooks/useSignalRHub';

export const SummaryCards = () => {
  const { data, loading, error, fetchData } = useGetAllSummary();
  const { messages } = useSignalRNotifications();

  // Llama a fetchData cada vez que se recibe una nueva notificación
  useEffect(() => {
    if (messages.length > 0) {
      fetchData();
    }
  }, [messages, fetchData]);

  // Verifica que data esté definido y no esté vacío
  const summaryData = Array.isArray(data) && data.length > 0 ? data[0] : null;

  return (
    <DataStatus loading={loading} error={error} data={data}>
      {summaryData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
          {/* Total de Ventas */}
          <div className="flex items-center justify-between p-4 rounded-lg shadow-lg bg-green-200">
            <div className="flex items-center space-x-3">
              <FaShoppingCart className="text-3xl" />
              <div>
                <h2 className="text-xl font-semibold">Total de Ventas</h2>
                <p className="text-2xl">{summaryData?.totalVentas}</p>
              </div>
            </div>
          </div>

          {/* Órdenes Completadas */}
          <div className="flex items-center justify-between p-4 rounded-lg shadow-lg bg-blue-200">
            <div className="flex items-center space-x-3">
              <FaCheckCircle className="text-3xl" />
              <div>
                <h2 className="text-xl font-semibold">Órdenes Completadas</h2>
                <p className="text-2xl">{summaryData?.ordenesCompletadas}</p>
              </div>
            </div>
          </div>

          {/* Total de Usuarios */}
          <div className="flex items-center justify-between p-4 rounded-lg shadow-lg bg-purple-200">
            <div className="flex items-center space-x-3">
              <FaUser className="text-3xl" />
              <div>
                <h2 className="text-xl font-semibold">Total de Usuarios</h2>
                <p className="text-2xl">{summaryData?.totalUsuarios}</p>
              </div>
            </div>
          </div>

          {/* Ingresos del Mes */}
          <div className="flex items-center justify-between p-4 rounded-lg shadow-lg bg-red-200">
            <div className="flex items-center space-x-3">
              <FaDollarSign className="text-3xl" />
              <div>
                <h2 className="text-xl font-semibold">Ingresos del Mes</h2>
                <p className="text-2xl">${summaryData?.ingresosDelMes}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg font-semibold">No se encontraron datos válidos.</p>
      )}
    </DataStatus>
  );
};

export default SummaryCards;