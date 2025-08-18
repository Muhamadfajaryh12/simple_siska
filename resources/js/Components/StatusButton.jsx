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
        case "selesai":
            background = "bg-green-500";
            break;
        default:
            break;
    }

    return (
        <div
            className={`text-white text-sm ${background} inline-flex justify-center items-center px-4 py-2 text-center border border-gray-300 rounded-md font-semibold text-xs  uppercase tracking-widest shadow-sm  f disabled:opacity-25 transition ease-in-out duration-150 `}
        >
            {children}
        </div>
    );
};

export default StatusButton;
