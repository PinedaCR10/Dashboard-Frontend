
import { SimplifiedSalesData } from '../../types/SignalRType';

export const RecentActivity = ({ salesData }: { salesData: SimplifiedSalesData | null }) => {
  if (!salesData) {
    return <p className="text-gray-600 mt-4">No hay datos de ventas disponibles</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mt-8 text-gray-800">Datos de Ventas en Tiempo Real</h2>
      <div className="py-4 flex space-x-4 items-center mt-4 bg-gray-100 rounded-lg shadow-md p-4">
        <div className="p-3 rounded-full bg-blue-100 text-blue-500 shadow-md">
          {/* Puedes agregar un ícono aquí */}
        </div>
        <div className="flex-1">
          <p className="text-gray-800 font-semibold"><strong>Nombre del Producto:</strong> {salesData.Name}</p>
          <p className="text-gray-800 font-semibold"><strong>Descripción:</strong> {salesData.Description}</p>
          <p className="text-gray-800 font-semibold"><strong>Precio:</strong> ${salesData.Price.toFixed(2)}</p>
          <p className="text-gray-800 font-semibold"><strong>AffiliateId:</strong> {salesData.AffiliateId}</p>
          <p className="text-gray-800 font-semibold"><strong>CardId:</strong> {salesData.CardId}</p>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
