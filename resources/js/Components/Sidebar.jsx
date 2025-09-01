import { Link, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { CiBookmark, CiCalendar, CiUser, CiViewList } from "react-icons/ci";
import { PiStudent, PiChalkboardTeacherLight } from "react-icons/pi";
import { GoBook, GoDatabase } from "react-icons/go";
import {
    FaBook,
    FaCalendar,
    FaChartBar,
    FaChartColumn,
    FaDashcube,
    FaUser,
} from "react-icons/fa6";
import { MdClass, MdPayment } from "react-icons/md";

const Sidebar = ({ auth, open }) => {
    const list = {
        Dashboard: [
            {
                title: "Dashboard",
                link: "dashboard.admin",
                role: "Admin",
                icon: <FaChartColumn />,
            },
            {
                title: "Dashboard",
                link: "dashboard.dosen",
                role: "Dosen",
                icon: <FaDashcube />,
            },
        ],

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
                title: "Tahun Ajaran",
                link: "tahun_ajaran.index",
                role: "Admin",
                icon: <GoDatabase />,
            },
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
                link: "profile.index",
                role: "Mahasiswa",
                icon: <CiUser />,
            },
        ],
        Perkuliahan: [
            {
                title: "Jadwal",
                link: "jadwal_perkuliahan_mahasiswa.index",
                role: "Mahasiswa",
                icon: <CiCalendar />,
            },
            {
                title: "Tugas",
                link: "tugas_kuliah_mahasiswa.index",
                role: "Mahasiswa",
                icon: <GoBook />,
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
        "Tagihan & Pembayaran": [
            {
                title: "Tagihan UKT",
                link: "tagihan_ukt.mahasiswa_index",
                role: "Mahasiswa",
                icon: <MdPayment />,
            },
        ],
        Keuangan: [
            {
                title: "UKT",
                link: "ukt.admin_index",
                role: "Admin",
                icon: <MdPayment />,
            },
        ],
        Pewalian: [
            {
                title: "Kelas",
                link: "kelas_perwalian.index",
                role: "Dosen",
                icon: <MdClass />,
            },
        ],
    };

    const { url } = usePage();
    const pathname = url.replace(/_/g, " ").split("/");

    return (
        <div
            className={`${
                open ? "block" : "hidden"
            } border-r bg-white min-h-screen w-72`}
        >
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
