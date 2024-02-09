import { createContext, useContext, useState } from "react";

const authContext = createContext();
export const Authcontext = ({children}) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    console.log("Logged in:", isLoggedIn);

    const login = () => setLoggedIn(true);
    const logout = () => setLoggedIn(false);

    return (
    <authContext.Provider value={{isLoggedIn, login, logout}}>
        {children}
    </authContext.Provider>
    );
}
export const useAuth = () => useContext(authContext);