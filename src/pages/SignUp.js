import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../components/AuthContext";
import {useForm} from "react-hook-form";
import InputField from "../components/InputField";


function SignUp() {
    const {login} = useContext(AuthContext);
    const {handleSubmit, formState: {errors, isDirty, isValid}, register} = useForm({
        mode: "onBlur",
        defaultValues: {
            "userName": "",
            "emailField": "",
            "passwordField": "",
        }
    });


    function onFormSubmitRegister(data) {
        // e.preventDefault();
        login();
        console.log(data);
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>

            <form onSubmit={handleSubmit(onFormSubmitRegister)}>
                <fieldset>
                    <legend>Registreren:</legend>

                  {/*  <label htmlFor="user-name-field">
                        Gebruikersnaam:
                        <input
                            id="user-name-field"
                            className="userName"
                            type="text"
                            placeholder="Uw gebruikersnaam"
                            {...register("userName", {
                                MinLength: {value: 6, message: "Gebruikersnaam moet minstens 6 karakters lang zijn"},
                            })}

                        />
                    </label>
                    {errors.userName && <p>{errors.userName.message}</p>}*/}


                    <InputField
                        label="Gebruikersnaam"
                        name="userName"
                        inputType="text"
                        placeholder="Uw gebruikersnaam"
                        register={register}
                        validationObject={{
                        minLength: {
                            value: 6,
                            message:"Gebruikersnaam moet minstens 6 karakters lang zijn",
                        },}}

                    />




                    <label htmlFor="register-email-field">
                        E-mail:
                        <input
                            id="register-email-field"
                            className="emailField"
                            type="email"
                            placeholder="Uw e-mail adres"
                            {...register("emailField", {
                                required: {
                                    value: true,
                                    message: "E-mail adres kan niet leeg zijn en moet een @ bevatten",
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9.! #$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                    </label>
                    {errors.emailField && <p>{errors.emailField.message}</p>}

                    <label htmlFor="register-password-field">
                        Wachtwoord:
                        <input
                            id="register-password-field"
                            className="passwordField"
                            type="password"
                            placeholder="Uw wachtwoord"
                            {...register("passwordField", {
                                required: "Wachtwoord moet minstens 8 karakters lang zijn",
                                minLength: {value: 8, message: "Wachtwoord moet minstens 8 karakters lang zijn",}

                            })}
                        />
                    </label>
                    {errors.passwordField && <p>{errors.passwordField.message}</p>}

                    <button
                        type="submit"
                        disabled={!isDirty || !isValid}
                    >Registreren
                    </button>
                </fieldset>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    )
        ;
}

export default SignUp;