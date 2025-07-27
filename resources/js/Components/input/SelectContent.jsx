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
}) => {
    return (
        <div className="my-2 flex flex-col gap-4">
            <InputLabel htmlFor={name} value={label} />
            <Select
                data={data}
                valueField={valueField}
                labelField={labelField}
                onChange={(e) => handleChange(e.target.value)}
                name={name}
            />
            <InputError message={errors} />
        </div>
    );
};

export default SelectContent;
