import { Link, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { CiViewList } from "react-icons/ci";
import { PiStudent, PiChalkboardTeacherLight } from "react-icons/pi";
import { GoDatabase } from "react-icons/go";

const Sidebar = ({ auth }) => {
    const list = {
        Pengguna: [
            {
                title: "Mahasiswa",
                link: "mahasiswa.index",
                role: "Admin",
                icon: <PiStudent />,
            },
            {
                title: "Dosen",
                link: "dosen.index",
                role: "Admin",
                icon: <PiChalkboardTeacherLight />,
            },
        ],

        "Master Data": [
            {
                title: "Fakultas",
                link: "fakultas.index",
                role: "Admin",
                icon: <GoDatabase />,
            },
            {
                title: "Program Studi",
                link: "prodi.index",
                role: "Admin",
                icon: <GoDatabase />,
            },
            {
                title: "Golongan UKT",
                link: "golongan_ukt.index",
                role: "Admin",
                icon: <GoDatabase />,
            },
        ],
        "Manajemen Kuliah": [
            {
                title: "Mata Kuliah",
                link: "matakuliah.index",
                role: "Admin",
                icon: <GoDatabase />,
            },
            {
                title: "Kelas Mata Kuliah",
                link: "kelas_mata_kuliah.index",
                role: "Admin",
                icon: <GoDatabase />,
            },
            {
                title: "Kelas",
                link: "kelas.index",
                role: "Admin",
                icon: <GoDatabase />,
            },
        ],
        "Kartu Rencana Studi": [
            {
                title: "Kartu Rencana Studi",
                link: "krs_dosen.index",
                role: "Dosen",
                icon: <GoDatabase />,
            },
            {
                title: "Penilaian",
                link: "nilai_dosen.index",
                role: "Dosen",
                icon: <GoDatabase />,
            },
            {
                title: "Kartu Rencana Studi",
                link: "krs_mahasiswa.index",
                role: "Mahasiswa",
                icon: <GoDatabase />,
            },
        ],
        "Data Pengguna": [
            {
                title: "Profile",
                link: "krs_dosen.index",
                role: "Mahasiswa",
                icon: <GoDatabase />,
            },
        ],
        Perkuliahan: [
            {
                title: "Jadwal Perkuliahan",
                link: "jadwal_perkuliahan_mahasiswa.index",
                role: "Mahasiswa",
                icon: <GoDatabase />,
            },
        ],
        "Kelas Mengajar": [
            {
                title: "Kelas",
                link: "kelas_mengajar.index",
                role: "Dosen",
                icon: <GoDatabase />,
            },
        ],
    };

    const { url } = usePage();
    const pathname = url.replace(/_/g, " ").split("/");

    return (
        <div className="w-72 border-r bg-white min-h-screen">
            <h1 className="text-red-600 font-bold text-4xl text-center my-4">
                SISKA
            </h1>
            <ul className="my-4 mx-auto p-4">
                {Object.keys(list).map((group) => {
                    const filteredList = list[group].filter(
                        (menu) => menu.role == auth?.user?.role
                    );

                    if (filteredList.length > 0)
                        return (
                            <div className="mb-4">
                                <h1 className="font-semibold">{group}</h1>
                                <div className="border-b  my-2"></div>
                                {filteredList.map((items) => (
                                    <li
                                        key={items.title}
                                        className={`hover:bg-gray-100 p-2 rounded-md  flex items-center mt-2 ${
                                            pathname.includes(
                                                items.title.toLowerCase()
                                            )
                                                ? "bg-gray-100"
                                                : ""
                                        }`}
                                        style={{ letterSpacing: "1px" }}
                                    >
                                        {items?.icon}
                                        <Link
                                            href={route(items.link)}
                                            className="mx-2 text-sm "
                                        >
                                            {items.title}
                                        </Link>
                                    </li>
                                ))}
                            </div>
                        );
                })}
            </ul>
        </div>
    );
};

export default Sidebar;
