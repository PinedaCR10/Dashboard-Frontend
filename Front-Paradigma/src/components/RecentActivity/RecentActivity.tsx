import { useGetAllActivity } from "../../hooks/useGetAllActivity";
import { Activity } from "../../types/ActivityType";
import { FaUser, FaBox, FaCalendarAlt, FaClock, FaClipboardList } from 'react-icons/fa';

const RecentActivity = () => {
  const { data, loading, error } = useGetAllActivity();

  if (loading) {
    return <p className="text-center text-blue-600">Cargando actividades recientes...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No se encontraron actividades recientes.</p>;
  }

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Última Actividad</h2>
      <ul className="divide-y divide-gray-200">
        {data.map((activity: Activity) => (
          <li key={activity.id} className="py-4 flex space-x-4 items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500">
              <FaUser className="text-xl" />
            </div>
            <div className="flex-1">
              <p className="text-gray-800"><strong>Usuario:</strong> {activity.user}</p>
              <p className="text-gray-600 flex items-center">
                <FaBox className="mr-2 text-blue-500" /> 
                <span><strong>Producto:</strong> {activity.product}</span>
              </p>
              <p className="text-gray-600 flex items-center">
                <FaClipboardList className="mr-2 text-yellow-500" /> 
                <span><strong>Orden #:</strong> {activity.order}</span>
              </p>
              <p className="text-gray-600 flex items-center">
                <FaCalendarAlt className="mr-2 text-green-500" /> 
                <span><strong>Fecha:</strong> {activity.date}</span>
              </p>
              <p className="text-gray-600 flex items-center">
                <FaClock className="mr-2 text-purple-500" /> 
                <span><strong>Hora:</strong> {activity.hour} hrs</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
