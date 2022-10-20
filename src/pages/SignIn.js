import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../components/AuthContext";
import {useForm} from "react-hook-form";
import InputField from "../components/InputField";
import axios from "axios";


function SignIn() {
    const {loginFunction} = useContext(AuthContext);
    const {handleSubmit, formState: {errors}, register} = useForm({
        mode: "onBlur",
        defaultValues: {
            "email": "",
            "password": "",
        }
    });

    // function onFormSubmit(data, e) {
    //     e.preventDefault();
    //     console.log(data);
    // }

    async function clickHandler(data) {
        // Verzend de inloggegevens via een post-request naar de backend
        try {


        // 1. Het endpoint wordt: http://localhost:3000/login
        // 2. We moeten de keys "email" en "password" gebruiken
            const response = await axios.post("http://localhost:3000/login", {
                email: data.email,
                password: data.password,

            });
            // We krijgen een token terug
            console.log("token uit de backend teruggekregen na inloggen", response.data.accessToken);
            loginFunction(response.data.accessToken);

    } catch (e) {
            console.error(e);
        }

    }
    //
    // useEffect(() => {
    //     // Is er een token? En is deze nog geldig?
    //
    //     // Ja? Haal de gebruikersdata opnieuw op en zet in de stat!
    //     // Nee? Dan blijft de state leeg
    //     loginFunction();
    //     },[]
    // );

        // async function onFormSubmit(e) {
        //     e.preventDefault();
        //
        //     try {
        //         const response = await axios.post("http://localhost:3000/login", {
        //             email: email,
        //             password: password,
        //
        //         })
        //         console.log(response.data.accessToken);
        //         loginFunction(response.data.accessToken);
        //         // setEmail(response.data);
        //     } catch (e) {
        //         console.error(e);
        //     }
        // }


    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit(clickHandler)}>
                <fieldset>
                    <legend>Inloggen:</legend>

                    <InputField
                        label="E-mail:"
                        name="email"
                        inputType="email"
                        placeholder="Uw e-mail adres"
                        register={register}
                        errors={errors}
                        validationObject={{
                            required: {
                                message: "E-mail adres kan niet leeg zijn",
                            },
                            pattern: {
                                value: /@\w+/g,
                                message: "E-mail adres moet een @ bevatten",
                            }
                        }}
                    >
                    </InputField>

                    <InputField
                        label="Wachtwoord:"
                        name="password"
                        inputType="password"
                        placeholder="Uw wachtwoord"
                        register={register}
                        errors={errors}
                        validationObject={{
                            required: "Wachtwoord mag niet leeg zijn",
                            minLength: {
                                value: 8,
                                message: "Wachtwoord moet minstens 8 karakters lang zijn",
                            }
                        }}
                    >
                    </InputField>

                    <button
                        type="submit"
                        // disabled={!isDirty || !isValid}
                    >Inloggen
                    </button>

                </fieldset>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;