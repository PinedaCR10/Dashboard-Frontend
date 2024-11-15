export const getProfile = async () => {
    try {
        const response = await fetch("https://enpoint.com", { // enpoint
            method: "GET",
            credentials: "include"  
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al iniciar sesión");
        }

        const userData = await response.json(); 
        return userData;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error al iniciar sesión:", error.message);
            throw error;
        } else {
            console.error("Error desconocido:", error);
            throw new Error("Error desconocido");
        }
    }
};

export default getProfile;

// Cambien el axios por fetch, pero igual si no les gusta pueden usar el axios, es que a mi no me gusta jaja