import React from "react";
import InputLabel from "../InputLabel";
import Select from "../Select";
import InputError from "../InputError";

const SelectContent = ({
    label,
    data,
    valueField,
    labelField,
    name,
    handleChange,
    errors,
    value,
}) => {
    return (
        <div className=" flex flex-col gap-2">
            <InputLabel htmlFor={name} value={label} />
            <Select
                data={data}
                valueField={valueField}
                labelField={labelField}
                onChange={handleChange}
                name={name}
                value={value}
            />
            <InputError message={errors} />
        </div>
    );
};

export default SelectContent;
