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
  const { data, loading, error } = useGetAllChartData();

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const formattedData = data.map((item) => ({
    ...item,
    Costos: Number(item.Costos),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-4 md:px-8 lg:px-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center p-4">
          Dashboard de Costos por Usuarios
        </h1>

        <div className="h-64 w-full md:h-96">
          <ResponsiveContainer>
            <BarChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Usuarios" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Costos" fill="#1e40af" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
