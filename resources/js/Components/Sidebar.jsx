import { Link } from "@inertiajs/react";
import React, { useState } from "react";

const Sidebar = () => {
    const [active, setActive] = useState(null);
    const list = [
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
    ];
    const handleSetActive = (title) => {
        setActive(title);
    };
    return (
        <div className="w-80 bg-gray-100 h-screen">
            <ul className="my-4 mx-auto p-2">
                {list.map((item) => (
                    <li
                        key={item.title}
                        className={`hover:bg-gray-200 p-1 rounded-md ${
                            active == item.title ? "bg-gray-200" : ""
                        }`}
                        style={{ letterSpacing: "1px" }}
                        onClick={() => handleSetActive(item.title)}
                    >
                        <Link href={route(item.link)} className="mx-2">
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
