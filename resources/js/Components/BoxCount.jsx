import React from "react";

const BoxCount = ({ count, title }) => {
    return (
        <div className="p-2 text-center font-bold shadow-sm rounded-sm border w-64">
            <h6 className="text-xl">{title}</h6>
            <h6 className="text-3xl">{count}</h6>
        </div>
    );
};

export default BoxCount;
