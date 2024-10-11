
const RecentActivity = () => {
    const activities = [
      { id: 1, description: "Nuevo usuario registrado: Juan Pérez", time: "Hace 2 horas" },
      { id: 2, description: "Orden #2345 completada", time: "Hace 1 hora" },
      { id: 3, description: "Producto 'Laptop X' está por agotarse", time: "Hace 3 horas" },
    ];
  
    return (
      <div className="mt-8 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Última Actividad</h2>
        <ul>
          {activities.map((activity) => (
            <li key={activity.id} className="border-b py-2">
              <p>{activity.description}</p>
              <small className="text-gray-500">{activity.time}</small>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default RecentActivity;
  