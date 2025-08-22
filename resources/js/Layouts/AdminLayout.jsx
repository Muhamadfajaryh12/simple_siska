import Message from "@/Components/Message";
import Sidebar from "@/Components/Sidebar";
import { ModalProvider } from "@/Context/ModalContext";
import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { PiHamburger } from "react-icons/pi";

const AdminLayout = ({ title, children }) => {
    const { auth } = usePage().props;
    const { post } = useForm();
    const [open, setOpen] = useState(true);

    return (
        <div className="w-full min-h-screen bg-gray-100">
            <div className="flex">
                <Sidebar auth={auth} open={open} />
                <div className="w-full">
                    <div className="flex justify-between text-md mb-2 p-3 shadow bg-white">
                        <div className="flex justify-center gap-4 items-center">
                            <button onClick={() => setOpen(!open)}>
                                <FaBars />
                            </button>
                            <h6>{auth.user.mahasiswa.nama_mahasiswa}</h6>
                        </div>
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
