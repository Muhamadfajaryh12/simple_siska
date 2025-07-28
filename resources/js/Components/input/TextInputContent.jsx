import React from "react";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import InputError from "../InputError";

const TextInputContent = ({
    label,
    name,
    value,
    isFocused,
    type,
    errors,
    ...props
}) => {
    return (
        <div className=" flex w-full flex-col gap-2">
            <InputLabel htmlFor={name} value={label} />
            <TextInput
                type={type}
                isFocused={isFocused}
                value={value}
                {...props}
            />
            <InputError message={errors} />
        </div>
    );
};

export default TextInputContent;
