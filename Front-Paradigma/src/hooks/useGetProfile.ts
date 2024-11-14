import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import UserContext from "../context/UserContext/UserContext";
import { getProfile } from "./getProfile";
import { toast } from "react-toastify";

export const useGetProfile = () => {
    const LoginURL = import.meta.env.VITE_API_AUTH_URL;
    const ClientURL = import.meta.env.VITE_API_CLIENT_URL;

    const goToLogin = () => {
        window.location.href = `${LoginURL}/?redirect=${encodeURIComponent(ClientURL)}`;
    };

    const { setCurrentUser, setIsLogged } = useContext(UserContext);
    return useMutation({
        mutationFn: getProfile,
        onSuccess(data) {
            if (data) {
                localStorage.setItem("isLogged", "true");
                localStorage.setItem("currentUser", JSON.stringify(data));
                setCurrentUser(data);   
                setIsLogged(true);
            }
        },
        onError() {
            toast("Su sesión ha expirado.");    
            localStorage.removeItem("isLogged");
            localStorage.removeItem("currentUser");
            goToLogin();
        },
    });
};


