import { FaShoppingCart, FaUser, FaDollarSign, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';
import { useGetAllSummary } from '../../hooks/useGetAllSummary';

const SummaryCards = () => {
  const { data, loading, error } = useGetAllSummary();

  // Manejamos el estado de carga
  if (loading) {
    return <p>Cargando datos...</p>;
  }

  // Manejamos el error en caso de que ocurra
  if (error) {
    return <p>{error}</p>;
  }

  // Verificamos si los datos existen y no están vacíos
  if (!data || data.length === 0) {
    return <p>No se encontraron datos.</p>;
  }

  
  const summaryData = Array.isArray(data) ? data[0] : data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {/* Total de Ventas */}
      <div className="flex items-center justify-between p-4 rounded-lg shadow-lg bg-green-200">
        <div className="flex items-center space-x-3">
          <FaShoppingCart className="text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">Total de Ventas</h2>
            <p className="text-2xl">{summaryData.totalVentas}</p>
          </div>
        </div>
      </div>

      {/* Órdenes Completadas */}
      <div className="flex items-center justify-between p-4 rounded-lg shadow-lg bg-blue-200">
        <div className="flex items-center space-x-3">
          <FaCheckCircle className="text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">Órdenes Completadas</h2>
            <p className="text-2xl">{summaryData.ordenesCompletadas}</p>
          </div>
        </div>
      </div>

      {/* Órdenes Pendientes */}
      <div className="flex items-center justify-between p-4 rounded-lg shadow-lg bg-yellow-200">
        <div className="flex items-center space-x-3">
          <FaHourglassHalf className="text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">Órdenes Pendientes</h2>
            <p className="text-2xl">{summaryData.ordenesPendientes}</p>
          </div>
        </div>
      </div>

      {/* Total de Usuarios */}
      <div className="flex items-center justify-between p-4 rounded-lg shadow-lg bg-purple-200">
        <div className="flex items-center space-x-3">
          <FaUser className="text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">Total de Usuarios</h2>
            <p className="text-2xl">{summaryData.totalUsuarios}</p>
          </div>
        </div>
      </div>

      {/* Ingresos del Mes */}
      <div className="flex items-center justify-between p-4 rounded-lg shadow-lg bg-red-200">
        <div className="flex items-center space-x-3">
          <FaDollarSign className="text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">Ingresos del Mes</h2>
            <p className="text-2xl">${summaryData.ingresosDelMes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
