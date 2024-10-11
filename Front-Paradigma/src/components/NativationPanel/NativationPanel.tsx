
import { useNavigate } from 'react-router-dom'; 

const NavigationPanel = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center space-x-8 my-8">
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600"
        onClick={() => navigate("/dashboards")} 
      >
        Ver Gráficas
      </button>

    </div>
  );
};

export default NavigationPanel;
