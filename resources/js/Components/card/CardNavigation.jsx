import React from "react";

const CardNavigation = ({ data }) => {
    return (
        <div className="bg-white rounded-md p-4 flex flex-col gap-4 items-center justify-center h-32 hover:bg-gray-200">
            {data.icon}
            <h1 className="font-semibold text-center text-xl">{data.name}</h1>
        </div>
    );
};

export default CardNavigation;
