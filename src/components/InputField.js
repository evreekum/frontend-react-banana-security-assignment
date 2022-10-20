import React from "react";


function InputField({name, label, inputType, placeholder, register, validationObject, errors, setField}) {

    return (
        <label htmlFor={`${name}-field`}>{label}
            <input
                {...register(name, validationObject)}
                id={`${name}-field`}
                type={inputType}
                placeholder={placeholder}

            />
            {errors[name] && <p className="error-message">{errors[name].message}</p>}
        </label>
    )
}

export default InputField;
