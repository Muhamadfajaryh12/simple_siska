import React from "react";

const Alert = (message) => {
    return (
        <div className={`w-full p-2 mt-2 bg-green-300`}>{message.message}</div>
    );
};

export default Alert;
