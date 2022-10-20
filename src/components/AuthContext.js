import React, {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";



export const AuthContext = createContext({});


export function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        console.log("De context is zojuist opnieuw opgestart!");
        // Is er een token?
        const token = localStorage.getItem("token");
        console.log(token);

        // Is deze nog geldig? Tip: hier schrijf je een aparte validatie-functie voor
        if (token) {
            // Ja? Haal de gebruikersdata opnieuw op en zet in de state! Wat is de ID, hiervoor decoden we de token
            const decoded = jwtDecode(token);
            console.log(decoded);
            // // zo ja: haal gebruikersdata op en zet in de state

            fetchUserData(decoded.sub, token);

        } else {
            // Nee? Dan blijft de state leeg
            setAuth({
                ...auth,
                status: "done",
            });
        }

    }, []); // <--- [] betekent MOUNT effect

// Deze functie staat hier te wachten tot hij aangeroepen wordt (door useEffect of login)
    async function fetchUserData(id, token) {

        try {
            // axios request maken
            const response = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response.data);

            setAuth({
                ...auth,
                isAuth: true,
                status: "done",
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                },
            })
        } catch (e) {
            console.error(e);
            // als het request mis ging, willen we uiteindelijk de status ook o DONE zetten. Doe je dat zelf nog even?
        }
    }

        const history = useHistory();


    // function login(jwtToken) {
    //     localStorage.setItem('token', jwtToken);
    //     const decoded = jwt_decode(jwtToken);
    //     console.log(decoded);
    //     console.log("Ingelogd!");
    //     fetchData(decoded.sub, jwtToken);
    //
    // }

    function login(token) {
        console.log(token);
        // 1. Token opslaan in de localStorage
        localStorage.setItem("token", token);
        // 2. Token decoden om te kijken wie deze gebruiker is
        const decoded = jwtDecode(token);
        console.log("decoded token:", decoded);

    // 3. Zorgen dat die gegevens worden opgeslagen in de Context: (hier niet nodig want wordt al via de fetchUserData gedaaan)
        // setAuth({
        //     ...auth,
        //     isAuth: true,
        //     user: {
        //         email: decoded.email,
        //         id: decoded.sub,
        //
        //     },
        // });
        fetchUserData(decoded.sub, token);

        console.log("Ingelogd!");
        history.push("/profile");
    }


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
        isAuth: auth.isAuth, // ---> veranderlijke "dynamische" state data
        user: auth.user, // ---> veranderlijke "dynamische" state data
        loginFunction: login, // ---> functies om data te kunnen aanpassen
        logoutFunction: logout, // ---> functies om data te kunnen aanpassen
    }

    /*  function logout(e) {
          e.preventDefault();
          setIsAuth({isAuth: false});
          console.log("Uitgelogd!");
          history.push("/");
      }*/

    function logout() {

        // state overschrijven
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
        });
        // local Storage legen
        localStorage.clear();
        // loggen
        console.log("Uitgelogd!");
        // redirect
        history.push("/");
    }


    return (
        <AuthContext.Provider value={authContextData}>
            {auth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}