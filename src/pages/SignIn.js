import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../components/AuthContext";
import {useForm} from "react-hook-form";
import InputField from "../components/InputField";
import axios from "axios";


function SignIn() {
    const {isAuth, loginFunction} = useContext(AuthContext);
    const {handleSubmit, formState: {errors}, register} = useForm({
        mode: "onBlur",
        defaultValues: {
            "email": "",
            "password": "",
        }
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function onFormSubmit(data, e) {
        e.preventDefault();
        console.log(data);
    }

    async function clickHandler() {
        // Verzend de inloggegevens via een post-request naar de backend
        try {


        // 1. Het endpoint wordt: http://localhost:3000/login
        // 2. We moeten de keys "email" en "password" gebruiken
            const response = await axios.post("http://localhost:3000/login", {
                email: email,
                password: password,

            });
            // We krijgen een token terug
            console.log(response.data.accessToken);


    } catch (e) {
            console.error(e);
        }
    loginFunction();
    }

    // useEffect(() =>{
    //     loginFunction();},
    //     [isAuth]
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

            <form onSubmit={handleSubmit(onFormSubmit)}>
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
                        onChange={(e)=> setEmail(e.target.value)}
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
                        onChange={(e)=> setPassword(e.target.value)}
                    </InputField>
                    {isAuth.isAuth === true &&
                    <button
                        type="submit"
                        onClick={loginFunction}
                        // disabled={!isDirty || !isValid}
                    >Inloggen
                    </button>
                    }
                </fieldset>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;