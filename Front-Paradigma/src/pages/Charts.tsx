import { useGetAllChartData } from "../hooks/useGetAllChartData";
import Header from "../layout/Header";

export const Charts = () => {
  const { data, loading, error } = useGetAllChartData(); 

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-4 md:px-8 lg:px-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center p-4">
          Datos de la gráfica
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full m-5 border border-gray-200">
            <thead>
              <tr className="text-center bg-gray-100">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Usuarios</th>
                <th className="px-4 py-2 border">Producto</th>
                <th className="px-4 py-2 border">Costos</th>
                <th className="px-4 py-2 border">Estado</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr className="text-center h-9 border" key={item.id}>
                  <td className="px-4 py-2 border">{item.id}</td>
                  <td className="px-4 py-2 border">{item.Usuarios}</td>
                  <td className="px-4 py-2 border">{item.Producto}</td>
                  <td className="px-4 py-2 border">{item.Costos}</td>
                  <td className="px-4 py-2 border">{item.Estado ? "Activo" : "Inactivo"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
