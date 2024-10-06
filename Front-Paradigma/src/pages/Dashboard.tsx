import { useGetAllChartData } from "../hooks/useGetAllChartData";
import Header from "../layout/Header";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export const Dashboard = () => {
  const { data, loading, error } = useGetAllChartData(); // Usa el hook aquí

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Convertir la propiedad "Costos" a un número para usarla en el gráfico
  const formattedData = data.map((item) => ({
    ...item,
    Costos: Number(item.Costos),
  }));

  return (
    <div>
      <Header />
      <h1 className="text-4xl font-bold text-center p-8">
        Dashboard de Costos por Usuarios
      </h1>

      {/* Gráfico de barras mostrando los datos */}
      <div className="h-96 w-full ">
        <ResponsiveContainer >
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Usuarios" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Costos"  className="bg-zinc-100 h-full" fill="#1e40af" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
