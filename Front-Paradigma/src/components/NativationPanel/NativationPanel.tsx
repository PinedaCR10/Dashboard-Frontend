import { useState } from 'react';
import { RecentActivity } from '../RecentActivity/RecentActivity';
import useSalesData from '../../hooks/useSignalRHub';

export const NavigationPanel = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { salesData } = useSalesData();

    const openModal = () => {
        if (salesData) {
            setIsModalOpen(true);
        } else {
            console.warn('No hay datos disponibles para mostrar.');
        }
    };

    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <button
                onClick={openModal}
                className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transform transition-transform duration-300 ease-in-out hover:scale-105"
            >
                Ver Última Actividad
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative transform transition-transform duration-300 ease-out scale-95">
                        <button
                            onClick={closeModal}
                            className="text-gray-500 hover:text-gray-700 absolute top-3 right-3 text-2xl"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Última Actividad</h2>
                        <RecentActivity salesData={salesData} />
                    </div>
                </div>
            )}
        </div>
    );
};
