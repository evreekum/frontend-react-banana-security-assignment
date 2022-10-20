import React, {createContext, useState} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
// import axios from "axios";


export const AuthContext = createContext({});


export function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        // status: 'pending',
    });
    const history = useHistory();


    // function login(jwtToken) {
    //     localStorage.setItem('token', jwtToken);
    //     const decoded = jwt_decode(jwtToken);
    //     console.log(decoded);
    //     console.log("Ingelogd!");
    //     fetchData(decoded.sub, jwtToken);
    //
    // }

    function login (token) {
        console.log(token);
        localStorage.setItem('token', token);
        const decoded = jwt_decode(token);
        console.log("decoded token:", decoded);
        toggleIsAuth({
            ...isAuth,
            isAuth: true,
            user: null,
        });
        console.log("Ingelogd!")
        history.push("/profile");
    }

  /*  async function fetchData(id, token) {
        try {
            const data = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            toggleIsAuth({
                isAuth: true,
                user: {
                    username: data.data.username,
                    email: data.data.email,
                    id: data.data.id,
                },
            });
            console.log("Ingelogd met email!", data);
            history.push("/profile");
        } catch (e) {
            console.error(e);
        }
    }*/

    // ---- DE REST DOOR CONTEXT:
    // - Token opslaan in de localStorage
    // localStorage.setItem('token', token);
    //     const decodedToken =
    // ....
    //     (token);
    //     console.log("decoded token:", decodedToken);
    // - Indien nodig, nieuwe data opvragen van de gebruiker
    // Async function nodig om specifieke gegevens van gebruiker op te halen
    // - Zorgen dat die gegevens worden opgeslagen in Context
    // - Authentication naar true;

    const authContextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        loginFunction: login,
        logoutFunction: logout,
    }

  /*  function logout(e) {
        e.preventDefault();
        toggleIsAuth({isAuth: false});
        console.log("Uitgelogd!");
        history.push("/");
    }*/

    function logout (e) {
        e.preventDefault();
        toggleIsAuth({
            ...isAuth,
            isAuth: false,
            user: null,
        });
        console.log("Uitgelogd!")
        history.push("/");
    }


    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}