import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { CiViewList } from "react-icons/ci";

const Sidebar = () => {
    const [active, setActive] = useState(null);
    const list = [
        {
            title: "Dashboard",
            link: "dashboard.dosen",
        },
        {
            title: "Master Data Mahasiswa",
            link: "user.mahasiswaIndex",
        },
        {
            title: "Master Data Dosen",
            link: "user.dosenIndex",
        },
        {
            title: "Master Data Fakultas",
            link: "fakultas.index",
        },
        {
            title: "Master Data Program Studi",
            link: "prodi.index",
        },
        {
            title: "Master Data Mata Kuliah",
            link: "matakuliah.index",
        },
        {
            title: "Master Data Kelas",
            link: "kelas.create",
        },
        {
            title: "Kartu Rencana Studi",
            link: "krs_dosen.index",
        },
    ];
    const handleSetActive = (title) => {
        setActive(title);
    };
    return (
        <div className="w-80 border-r bg-white h-screen">
            <ul className="my-4 mx-auto p-2">
                {list.map((item) => (
                    <li
                        key={item.title}
                        className={`hover:bg-gray-200 p-1 rounded-md  flex items-center mt-2 ${
                            active == item.title ? "bg-gray-200" : ""
                        }`}
                        style={{ letterSpacing: "1px" }}
                        onClick={() => handleSetActive(item.title)}
                    >
                        <CiViewList />
                        <Link href={route(item.link)} className="mx-2 text-sm">
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
