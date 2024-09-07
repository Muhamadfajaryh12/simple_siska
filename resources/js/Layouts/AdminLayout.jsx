import Sidebar from "@/Components/Sidebar";
import React from "react";

const AdminLayout = ({ title, children }) => {
    return (
        <div className="w-screen h-screen bg-white">
            <div className="flex">
                <Sidebar />
                <div className="m-2 w-full">
                    <h2
                        className="font-bold text-2xl "
                        style={{ letterSpacing: "1px" }}
                    >
                        {title}
                    </h2>
                    <div className="w-full">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
