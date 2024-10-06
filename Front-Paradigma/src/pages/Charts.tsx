import { useGetAllChartData } from "../hooks/useGetAllChartData";
import Header from "../layout/Header";


export const Charts = () => {
  
    const { data, loading, error } = useGetAllChartData(); // Usa el hook aquí

    if (loading) {
      return <p>Cargando datos...</p>;
    }
  
    if (error) {
      return <p>{error}</p>;
    }

  return (
    <div>
      <Header />
      <h1 className="text-4xl font-bold text-center p-8">Datos de la grafica</h1>

      <table className=" w-full m-5 space-x-5">
        <thead>
          <tr className="text-center ">
            <th>ID</th>
            <th>Usuarios</th>
            <th>Producto</th>
            <th>Costos</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr className="text-center h-9" key={item.id}>
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


