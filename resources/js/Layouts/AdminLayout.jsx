import Message from "@/Components/Message";
import Sidebar from "@/Components/Sidebar";
import { ModalProvider } from "@/Context/ModalContext";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { PiHamburger } from "react-icons/pi";

const AdminLayout = ({ title, children }) => {
    const { auth } = usePage().props;
    const { post } = useForm();
    const [open, setOpen] = useState(true);
    const [name, setName] = useState("Admin");

    useEffect(() => {
        switch (auth.user.role) {
            case "Dosen":
                return setName(auth.user.dosen.nama_dosen);
            case "Mahasiswa":
                return setName(auth.user.mahasiswa.nama_mahasiswa);
            default:
                break;
        }
        console.log(auth);
    }, []);
    return (
        <div className="w-full min-h-screen bg-gray-200">
            <div className="flex">
                <Sidebar auth={auth} open={open} />
                <div className="w-full">
                    <div className="flex justify-between text-md mb-2 p-3 shadow bg-white">
                        <div className="flex justify-center gap-4 items-center">
                            <button onClick={() => setOpen(!open)}>
                                <FaBars />
                            </button>
                            <h6>{name}</h6>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="\ text-sm rounded-md">
                                <h1>Tahun Ajaran {auth.tahun_ajaran}</h1>
                            </div>
                            <button
                                className="mr-10 text-sm bg-black text-white p-2 rounded-md"
                                onClick={() => post(route("logout"))}
                            >
                                <LuLogOut size={20} />
                            </button>
                        </div>
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
