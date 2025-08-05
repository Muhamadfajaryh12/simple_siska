import React from "react";

const Select = ({
    className = "",
    data,
    valueField = "id",
    labelField = "nama",
    opsionalField = "",
    disabled = false,
    ...props
}) => {
    console.log(disabled);
    return (
        <select
            {...props}
            className={
                "border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " +
                className
            }
            disabled={disabled}
        >
            <option value="">Choose</option>
            {data?.map((item) => (
                <option key={item[valueField]} value={item[valueField]}>
                    {item[labelField]} {item[opsionalField]}
                </option>
            ))}
        </select>
    );
};

export default Select;
