import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../components/AuthContext";
import {useForm} from "react-hook-form";
import axios from "axios";

function SignIn() {
    const {login} = useContext(AuthContext);
    const {handleSubmit, formState: {errors, isDirty, isValid}, register} = useForm({
        mode:"onBlur",
        defaultValues: {
            "emailField": "",
            "passwordField": "",
        }
        });


    function onFormSubmit(data) {
        // e.preventDefault();
        login();
        console.log(data);
    }

    async function clickHandler() {
        // Verzend de inloggegevens via een post-request naar de backend
        try {


        // 1. Het endpoint wordt: http://localhost:3000/login
        // 2. We moeten de keys "email" en "password" gebruiken
            const response = await axios.post("http://localhost:3000/login", {
                email: 'piet.pieters@novi.nl',
                password: '123456'

            });
            // We krijgen een token terug
            console.log(response.data.accessToken);


    } catch (e) {
            console.error(e);
        }

    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit(onFormSubmit)}>
                <fieldset>
                    <legend>Inloggen:</legend>

                    <label htmlFor="email-field">
                        E-mail:
                        <input
                            id="email-field"
                            className="emailField"
                            type="email"
                            placeholder="Uw e-mail adres"
                            {...register("emailField", {
                                required: {
                                    value: true,
                                    message: "E-mail adres kan niet leeg zijn en moet een @ bevatten",
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                    </label>
                    {errors.emailField && <p>{errors.emailField.message}</p>}

                    <label htmlFor="password-field">
                        Wachtwoord:
                        <input
                            id="password-field"
                            className="passwordField"
                            type="password"
                            placeholder="Uw wachtwoord"
                            {...register("passwordField", {
                                required: "Wachtwoord moet minstens 8 karakters lang zijn",
                                MinLength: {value: 8, message: "Wachtwoord moet minstens 8 karakters lang zijn"},

                            })}
                        />
                    </label>
                    {errors.passwordField && <p>{errors.passwordField.message}</p>}

                    <button
                        type="submit"
                        onClick={clickHandler}
                        disabled={!isDirty || !isValid}
                    >Inloggen</button>
                </fieldset>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;