import Message from "@/Components/Message";
import Sidebar from "@/Components/Sidebar";
import { ModalProvider } from "@/Context/ModalContext";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";

const AdminLayout = ({ title, children }) => {
    const { auth } = usePage().props;
    const { post } = useForm();
    return (
        <div className="w-full min-h-screen bg-gray-100">
            <div className="flex">
                <Sidebar auth={auth} />
                <div className="w-full">
                    <div className="flex justify-between text-md mb-2 p-3 shadow bg-white">
                        <h6
                            className="font-bold"
                            style={{ letterSpacing: "2px" }}
                        >
                            Hello, Admin
                        </h6>
                        <button
                            className="mr-10 text-sm"
                            onClick={() => post(route("logout"))}
                        >
                            Logout
                        </button>
                    </div>
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="flex gap-2 text-md">
                                {title?.map((item, index) => (
                                    <>
                                        <span>{item}</span>
                                        {title?.length - 1 > index ? (
                                            <span>/</span>
                                        ) : (
                                            ""
                                        )}
                                    </>
                                ))}
                            </div>
                            <Message />
                            <div className=" mt-4 overflow-hidden shadow-sm sm:rounded-lg">
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
