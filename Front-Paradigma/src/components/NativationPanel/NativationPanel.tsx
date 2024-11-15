import { useState } from 'react';
import RecentActivity from '../RecentActivity/RecentActivity';


const NavigationPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex justify-center space-x-8 my-8">
      <button
        onClick={openModal}
        className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transform transition-transform duration-300 ease-in-out hover:scale-105"
      >
        Ver Última Actividad
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ease-out">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative transform transition-transform duration-300 ease-out scale-95">
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 absolute top-3 right-3 text-2xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Última Actividad</h2>
            <RecentActivity  />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationPanel;
