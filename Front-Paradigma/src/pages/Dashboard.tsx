import { useEffect, useState } from "react";
import Header from "../components/Header";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";


interface DashboardData {
  id: string;
  Costos: string;
  Usuarios: string;
  Producto: string;
  Estado: boolean;
}

const Graficos = () => {
  const [data, setData] = useState<DashboardData[]>([]);  

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://6662962a62966e20ef091eb7.mockapi.io/api/Dashboard");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  
  const formattedData = data.map((item) => ({
    ...item,
    Costos: Number(item.Costos),
  }));

  return (
    <div>
      <Header />
      <h1>Dashboard de Costos por Usuarios</h1>

      
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Usuarios" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Costos" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graficos;
