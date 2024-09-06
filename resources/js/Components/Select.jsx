import React from "react";

const Select = ({
    className = "",
    data,
    valueField = "id",
    labelField = "nama",
    ...props
}) => {
    return (
        <select
            {...props}
            className={
                "border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " +
                className
            }
        >
            <option value="">Choose</option>
            {data.map((item) => (
                <option key={item[valueField]} value={item[valueField]}>
                    {item[labelField]}
                </option>
            ))}
        </select>
    );
};

export default Select;
