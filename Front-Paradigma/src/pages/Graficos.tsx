import { useEffect, useState } from "react";
import Header from "../components/Header";


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

  return (
    <div>
      <Header />
      <h1>Datos de la grafica</h1>

      <table style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuarios</th>
            <th>Producto</th>
            <th>Costos</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.Usuarios}</td>
              <td>{item.Producto}</td>
              <td>{item.Costos}</td>
              <td>{item.Estado ? "Activo" : "Inactivo"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Graficos;
