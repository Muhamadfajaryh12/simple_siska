import Sidebar from "@/Components/Sidebar";
import { useForm } from "@inertiajs/react";
import React from "react";

const AdminLayout = ({ title, children }) => {
    const { post } = useForm();
    return (
        <div className="w-screen h-screen bg-gray-100">
            <div className="flex">
                <Sidebar />
                <div className="w-full">
                    <div className="flex justify-between text-md mb-2 p-2 shadow bg-white">
                        <h2
                            className="font-bold"
                            style={{ letterSpacing: "1px" }}
                        >
                            {title}
                        </h2>
                        <button onClick={() => post(route("logout"))}>
                            Logout
                        </button>
                    </div>
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-1 p-6 ">
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
