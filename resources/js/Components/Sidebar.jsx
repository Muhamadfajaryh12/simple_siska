import { Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { CiViewList } from "react-icons/ci";

const Sidebar = ({ auth }) => {
    const list = [
        // {
        //     title: "Dashboard",
        //     link: "dashboard.dosen",
        //     role: "Dosen",
        // },
        {
            title: "Mahasiswa",
            link: "mahasiswa.index",
            role: "Admin",
        },
        {
            title: "Dosen",
            link: "dosen.index",
            role: "Admin",
        },
        {
            title: "Fakultas",
            link: "fakultas.index",
            role: "Admin",
        },
        {
            title: "Program Studi",
            link: "prodi.index",
            role: "Admin",
        },
        {
            title: "Mata Kuliah",
            link: "matakuliah.index",
            role: "Admin",
        },
        {
            title: "Kelas Mata Kuliah",
            link: "kelas_mata_kuliah.index",
            role: "Admin",
        },
        {
            title: "Kelas",
            link: "kelas.index",
            role: "Admin",
        },
        {
            title: "Kartu Rencana Studi",
            link: "krs_dosen.index",
            role: "Dosen",
        },
        {
            title: "Penilaian",
            link: "nilai_dosen.index",
            role: "Dosen",
        },
    ];

    const { url } = usePage();
    const pathname = url.split("/");

    return (
        <div className="w-64 border-r bg-white min-h-screen">
            <h1 className="text-red-600 font-bold text-4xl text-center my-4">
                SISKA
            </h1>
            <ul className="my-4 mx-auto p-2">
                {list.map((item) =>
                    item.role == auth?.user?.role ? (
                        <li
                            key={item.title}
                            className={`hover:bg-gray-200 p-2 rounded-md  flex items-center mt-2 ${
                                pathname.includes(item.title.toLowerCase())
                                    ? "bg-gray-200"
                                    : ""
                            }`}
                            style={{ letterSpacing: "1px" }}
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
