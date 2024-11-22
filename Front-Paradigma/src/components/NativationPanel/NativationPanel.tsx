import { useState } from 'react';
import ReactDOM from 'react-dom';
import useSalesData from '../../hooks/useSignalRHub';
import { RecentActivity } from '../RecentActivity/RecentActivity';

export const NavigationPanel = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { salesData, isConnected } = useSalesData();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <div className="flex items-center space-x-2">
                <div className="flex justify-center w-full">
                    <button
                        onClick={openModal}
                        className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transform transition-transform duration-300 ease-in-out hover:scale-105"
                    >
                        Ver Última Actividad
                    </button>
                </div>
                <div
                    className={`w-4 h-4 rounded-full   ${
                        isConnected ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    title={isConnected ? 'Conectado' : 'Desconectado'}
                />
                <p className="text-sm text-gray-600">
                    {isConnected ? 'Conexión establecida' : 'Conexión perdida'}
                </p>
            </div>

            {isModalOpen &&
                ReactDOM.createPortal(
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-auto relative transform transition-transform duration-300 ease-out scale-95">
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700 absolute top-3 right-3 text-2xl"
                            >
                                ✕
                            </button>
                            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 ">
                                Última Actividad
                            </h2>
                            <RecentActivity salesData={salesData || null} />
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default NavigationPanel;
