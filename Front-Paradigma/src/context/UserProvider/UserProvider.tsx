import { useEffect, useMemo, useState } from "react";
import UserContext from "../UserContext/UserContext";
import { User } from "../UserContext/UserContextType";
import { useGetProfile } from "../../hooks/useGetProfile";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLogged, setIsLogged] = useState<boolean>(() => {
        // REEMPLAZAR "authToken" con el nombre real de la cookie de autenticación
        return !!document.cookie.split('; ').find(row => row.startsWith('authToken='));
    });
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        const user = localStorage.getItem("currentUser");
        return user ? JSON.parse(user) : null;
    });

    const getProfile = useGetProfile();

    useEffect(() => {
      if (isLogged) {
          getProfile.mutate();
      } else {
          goToLogin(); 
      }
  }, [isLogged, getProfile]);

    const contextValue = useMemo(
        () => ({
            isLogged,
            setIsLogged,
            currentUser,
            setCurrentUser,
        }),
        [isLogged, currentUser]
    );

    return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );
};

// Es la función para redirigir, hay que REEMPLAZAR con la URL real del login 
const goToLogin = () => {
    const loginUrl = "https://login.del.otro.grupo.com";
    window.location.href = loginUrl;
};

export default UserProvider;
