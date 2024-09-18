import React from "react";

const Alert = ({ message, status }) => {
    return (
        <div
            className={`w-full p-2 mt-2 ${
                status == "error" ? "bg-red-300" : "bg-green-300"
            }`}
        >
            {message}
        </div>
    );
};

export default Alert;
