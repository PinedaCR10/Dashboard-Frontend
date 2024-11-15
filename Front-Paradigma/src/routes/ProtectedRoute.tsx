import { useContext } from "react";
import UserContext from "../context/UserContext/UserContext";

const Unauthorized = () => (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Acceso Restringido</h2>
        <p>No tienes autorización para acceder a esta página. Por favor, inicia sesión.</p>
        <button
            onClick={() => window.location.href = "https://login.del.otro.grupo.com"} // REEMPLAZAR con la URL real del login
            style={{
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                backgroundColor: "#1E40AF",
                color: "#FFF",
                border: "none",
                borderRadius: "5px"
            }}
        >
            Ir al Login
        </button>
    </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isLogged } = useContext(UserContext);

    if (!isLogged) {
        return <Unauthorized />;
    }

    return <>{children}</>; 
};

export default ProtectedRoute;
