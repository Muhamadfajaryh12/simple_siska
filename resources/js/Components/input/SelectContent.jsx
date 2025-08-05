import React from "react";
import InputLabel from "../InputLabel";
import Select from "../Select";
import InputError from "../InputError";

const SelectContent = ({
    label,
    data,
    valueField,
    labelField,
    opsionalField,
    name,
    handleChange,
    errors,
    value,
    disabled,
}) => {
    return (
        <div className=" flex flex-col gap-2">
            <InputLabel htmlFor={name} value={label} />
            <Select
                data={data}
                valueField={valueField}
                labelField={labelField}
                opsionalField={opsionalField}
                onChange={handleChange}
                name={name}
                value={value}
                disabled={disabled}
            />
            <InputError message={errors} />
        </div>
    );
};

export default SelectContent;
