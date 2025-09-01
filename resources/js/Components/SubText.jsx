import React from "react";

const SubText = ({ text }) => {
    return (
        <div className="flex gap-2 items-center mb-4">
            <div className="bg-green-600 h-4 w-4"></div>
            <h1 className="text-lg font-extrabold tracking-wide">{text}</h1>
        </div>
    );
};

export default SubText;
