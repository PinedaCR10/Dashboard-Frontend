import { ReactNode } from 'react';
import { FaSpinner, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

interface DataStatusProps {
  loading: boolean;
  error: string | null;
  data: unknown[]; // Cambiado de any a unknown[]
  children: ReactNode;
}

const DataStatus: React.FC<DataStatusProps> = ({ loading, error, data, children }) => {
  // Estado de carga
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center my-10">
        <FaSpinner className="text-blue-600 text-4xl animate-spin mb-2" />
        <p className="text-center text-blue-600 text-lg font-semibold">Cargando datos...</p>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center my-10">
        <FaExclamationCircle className="text-red-600 text-4xl mb-2" />
        <p className="text-center text-red-600 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  // Estado "sin datos"
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center my-10">
        <FaInfoCircle className="text-gray-500 text-4xl mb-2" />
        <p className="text-center text-gray-500 text-lg font-semibold">No se encontraron datos.</p>
      </div>
    );
  }

  // Si hay datos, renderiza el contenido
  return <>{children}</>;
};

export default DataStatus;
