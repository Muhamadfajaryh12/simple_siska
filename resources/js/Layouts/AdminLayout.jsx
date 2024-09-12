import Sidebar from "@/Components/Sidebar";
import React from "react";

const AdminLayout = ({ title, children }) => {
    return (
        <div className="w-screen h-screen bg-gray-100">
            <div className="flex">
                <Sidebar />
                <div className="w-full">
                    <h2
                        className="text-lg mb-2 p-2 shadow bg-white w-full "
                        style={{ letterSpacing: "1px" }}
                    >
                        {title}
                    </h2>
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-1">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
