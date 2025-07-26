import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { CiViewList } from "react-icons/ci";

const Sidebar = ({ auth }) => {
    console.log(auth);
    const list = [
        {
            title: "Dashboard",
            link: "dashboard.dosen",
            role: "Dosen",
        },
        {
            title: " Mahasiswa",
            link: "user.mahasiswaIndex",
            role: "Admin",
        },
        {
            title: " Dosen",
            link: "user.dosenIndex",
            role: "Admin",
        },
        {
            title: " Fakultas",
            link: "fakultas.index",
            role: "Admin",
        },
        {
            title: " Program Studi",
            link: "prodi.index",
            role: "Admin",
        },
        {
            title: " Mata Kuliah",
            link: "matakuliah.index",
            role: "Admin",
        },
        {
            title: " Kelas",
            link: "kelas.index",
            role: "Admin",
        },
        {
            title: "Kartu Rencana Studi",
            link: "krs_dosen.index",
            role: "Dosen",
        },
    ];

    return (
        <div className="w-80 border-r bg-white h-screen">
            <ul className="my-4 mx-auto p-2">
                {list.map((item) =>
                    item.role == auth?.user?.status ? (
                        <li
                            key={item.title}
                            className={`hover:bg-gray-200 p-2 rounded-md  flex items-center mt-2 ${
                                route().current(item.link) ? "bg-gray-200" : ""
                            }`}
                            style={{ letterSpacing: "1px" }}
                            onClick={() => handleSetActive(item.title)}
                        >
                            <CiViewList />
                            <Link
                                href={route(item.link)}
                                className="mx-2 text-sm"
                            >
                                {item.title}
                            </Link>
                        </li>
                    ) : (
                        ""
                    )
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
