import React from "react";


function InputField({name, label, inputType, placeholder, register, validationObject, errors}) {

    return (

        <label htmlFor={`${name}-field`}>{label}
            <input
                {...register(name, validationObject)}
                id={`${name}-field`}
                type={inputType}
                placeholder={placeholder}
            />

            {errors[name] && <p>{errors[name].message}</p>}
        </label>


    )
}

export default InputField;
