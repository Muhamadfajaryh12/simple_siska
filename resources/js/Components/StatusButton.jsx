import React from "react";

const StatusButton = ({ children }) => {
    let background = "";
    switch (children) {
        case "menunggu":
            background = "bg-blue-500";
            break;
        case "disetujui":
            background = "bg-green-500";
            break;
        case "ditolak":
            background = "bg-red-500";
            break;
        default:
            break;
    }

    return (
        <div className={`text-white ${background} rounded-md p-2 capitalize`}>
            {children}
        </div>
    );
};

export default StatusButton;
