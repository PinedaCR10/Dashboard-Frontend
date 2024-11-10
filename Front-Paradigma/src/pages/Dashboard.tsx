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
import DataStatus from "../error/error";

export const Dashboard = () => {
  const { data, loading, error } = useGetAllChartData();


  const formattedData = data.map((item) => ({
    ...item,
    Costos: Number(item.Costos),
  }));

  return (
    <DataStatus loading={loading} error={error} data={data}>
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-8 md:px-8 lg:px-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center ">
        User Cost Dashboard
        </h1>

        <div className=" h-64 w-full md:h-96 p-16">
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
    </DataStatus>
  );
};
