import React from "react";
// import {useForm} from "react-hook-form";

function InputField({name, label, inputType, placeholder, register, validationObject, errors}) {
    // const {register} = useForm();

    return (

            <label htmlFor={`${name}-field`}>{label}
                <input
                    {...register(name, validationObject)}
                    name={name}
                    id={`${name}-field`}
                    type={inputType}
                    placeholder={placeholder}

                />
                {errors[name] && <p>{errors[name].message}</p>}
            </label>


    )
}

export default InputField;


// <InputField
//     label="Gebruikersnaam"
//     name="userName"
//     inputType="text"
//     placeholder="Uw gebruikersnaam"
//      register=...register("userName, {}
//      MinLength: {value: 6, message: Gebruikersnaam moet minstens 6 karakters lang zijn},
//  />


// {/*{errors{name} && <p className="error-message">{errors.{name}.message}</p>}*/}
// {/*{errors[`.${name}`] && <p className="error-message">{errors[`.${name}`].message}</p>}*/}


// }
// }
// {...register("username", {
//     required: {
//         value: true,
//         message: "Gebruikersnaam mag niet leeg zijn en moet minstens 6 karakters lang zijn",
//
//     },
//     MinLength: {
//         value: 6,
//         message: "Gebruikersnaam moet minstens 6 karakters lang zijn",
//     },
// })}