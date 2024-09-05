import Sidebar from "@/Components/Sidebar";
import React from "react";

const AdminLayout = ({ title, component }) => {
    return (
        <div className="w-screen h-screen bg-white">
            <div className="flex">
                <Sidebar />
                <div className="m-2">
                    <h2
                        className="font-semibold text-2xl"
                        style={{ letterSpacing: "2px" }}
                    >
                        {title}
                    </h2>
                    {component}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
