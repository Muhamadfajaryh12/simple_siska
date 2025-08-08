import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CardNavigation from "@/Components/card/CardNavigation";
import {
    FaBars,
    FaClipboard,
    FaDollarSign,
    FaJugDetergent,
    FaMoneyBill,
    FaUser,
    FaUserGraduate,
} from "react-icons/fa6";
import { LuBookText } from "react-icons/lu";
import { IoBarChartOutline } from "react-icons/io5";
import { RiBillLine } from "react-icons/ri";
import { MdOutlinePayments } from "react-icons/md";

const dataNav = [
    {
        name: "Kartu Rencana Studi",
        icon: <LuBookText size={30} />,
    },
    {
        name: "Hasil Study",
        icon: <IoBarChartOutline size={30} />,
    },
    {
        name: "Profile",
        icon: <FaUser size={30} />,
    },
    {
        name: "UKT",
        icon: <MdOutlinePayments size={30} />,
    },
    {
        name: "Pendaftaran Sidang",
        icon: <RiBillLine size={30} />,
    },
    {
        name: "Wisuda",
        icon: <FaUserGraduate size={30} />,
    },
];
const DashboardMahasiswa = ({ auth }) => {
    return (
        <Authenticated user={auth.user}>
            <div className="grid grid-cols-3 gap-4 my-4 mx-auto">
                {dataNav.map((item) => (
                    <CardNavigation key={item.name} data={item} />
                ))}
            </div>
        </Authenticated>
    );
};

export default DashboardMahasiswa;
