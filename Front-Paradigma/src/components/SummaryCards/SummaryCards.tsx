
import { FaShoppingCart, FaUser, FaDollarSign, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';

const stats = [
  { title: "Total de Ventas", value: "5,230", icon: <FaShoppingCart />, color: "bg-green-200" },
  { title: "Órdenes Completadas", value: "1,234", icon: <FaCheckCircle />, color: "bg-blue-200" },
  { title: "Órdenes Pendientes", value: "345", icon: <FaHourglassHalf />, color: "bg-yellow-200" },
  { title: "Total de Usuarios", value: "2,100", icon: <FaUser />, color: "bg-purple-200" },
  { title: "Ingresos del Mes", value: "$15,300", icon: <FaDollarSign />, color: "bg-red-200" }
];

const SummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-4 rounded-lg shadow-lg ${stat.color}`}
        >
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{stat.icon}</div>
            <div>
              <h2 className="text-xl font-semibold">{stat.title}</h2>
              <p className="text-2xl">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
