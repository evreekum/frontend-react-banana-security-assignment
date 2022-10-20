import React from 'react';
import {Link, useHistory} from 'react-router-dom';

import {useForm} from "react-hook-form";
import InputField from "../components/InputField";
import axios from "axios";


function SignUp() {

    const {handleSubmit, formState: {errors}, register} = useForm({
        mode: "onBlur",
        defaultValues: {
            "username": "",
            "email": "",
            "password": "",
        }
    });
    const history = useHistory();

    async function onFormSubmit(data) {

        try {
            const response = await axios.post("http://localhost:3000/register", {
                email: data.email,
                password: data.password,
                username: data.username,

            })
            console.log(response);
            history.push("/signin");
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>

            <form onSubmit={handleSubmit(onFormSubmit)}>
                <fieldset>
                    <legend>Registreren:</legend>

                    <InputField
                        label="Gebruikersnaam:"
                        name="username"
                        inputType="text"
                        placeholder="Uw gebruikersnaam"
                        register={register}
                        errors={errors}
                        validationObject={{
                            required: "Gebruikersnaam mag niet leeg zijn",
                            minLength: {
                                value: 6,
                                message: "Gebruikersnaam moet minstens 6 karakters lang zijn",
                            }
                        }}
                    />

                    <InputField
                        label="E-mail:"
                        name="email"
                        inputType="email"
                        placeholder="Uw e-mail adres"
                        register={register}
                        errors={errors}
                        validationObject={{
                            required: {
                                message: "E-mail adres mag niet leeg zijn",
                            },
                            pattern: {
                                value: /@\w+/g,
                                message: "E-mail adres moet een @ bevatten",
                            }
                        }}
                    />

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
                    />

                    <button
                        type="submit"
                        // disabled={!isDirty || !isValid}
                    >Registreren
                    </button>

                </fieldset>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;