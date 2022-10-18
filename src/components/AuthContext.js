import React, {createContext, useState} from "react";
import {useHistory} from "react-router-dom";


export const AuthContext = createContext({});


export function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState(false);
    const history = useHistory();

    function login(token) {
        console.log(token);
        toggleIsAuth(true);
        history.push("/profile");


        // ---- DE REST DOOR CONTEXT:
        // - Token opslaan in de localStorage
        localStorage.setItem('token', token);
    //     const decodedToken =
    // ....
    //     (token);
    //     console.log("decoded token:", decodedToken);
        // - Indien nodig, nieuwe data opvragen van de gebruiker
        // Async function nodig om specifieke gegevens van gebruiker op te halen
        // - Zorgen dat die gegevens worden opgeslagen in Context
        // - Authentication naar true;


    }

    function logout() {
        console.log("Uitgelogd!");
        toggleIsAuth(false);
        history.push("/")
    }

    const authContextData = {
        isAuth,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}