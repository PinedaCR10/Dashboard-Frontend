import axios from "axios";

export const getProfile = async () => {
    try {
        const response = await axios.get("https://produccion2-production.up.railway.app/api/User/profile", 
            { withCredentials: true });
        const user = response.data;
        return user;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error(
                "Error al iniciar sesión:",
                error.response?.data || error.message
            );
            throw new Error(
                error.response?.data.message || "Error al iniciar sesión"
            );
        } else {
            console.error("Error desconocido:", error);
            throw new Error("Error desconocido");
        }
    }
};
