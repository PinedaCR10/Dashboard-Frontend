import { useEffect, useMemo, useState } from "react";
import UserContext from "../UserContext/UserContext";   
import { User } from "../UserContext/UserContextType";
import { useGetProfile } from "../../hooks/useGetProfile";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState<boolean>(() => {
    return localStorage.getItem("isLogged") === "true";
  });
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  });

  const getProfile = useGetProfile();

  useEffect(() => {
    getProfile.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
export default UserProvider;
