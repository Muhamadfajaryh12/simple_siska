import React from "react";
import Select from "./Select";

const FilterColumn = ({ filterData, onChange }) => {
    return (
        <div className="flex gap-2">
            {filterData.map((item) => (
                <Select
                    valueField={item.value}
                    labelField={item.label}
                    data={item.data}
                    onChange={(e) => onChange(item.key, e.target.value)}
                />
            ))}
        </div>
    );
};

export default FilterColumn;
