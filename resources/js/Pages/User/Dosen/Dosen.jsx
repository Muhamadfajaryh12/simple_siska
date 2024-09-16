import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const Dosen = ({ data, data_prodi }) => {
    const [dataDosen, setDataDosen] = useState([]);
    const [active, setActive] = useState(null);

    useEffect(() => {
        setDataDosen(data);
    }, [data]);

    const filterDataDosen = (value) => {
        const filter = data.filter((item) => item.id_prodi == value);
        setDataDosen(filter);
        setActive(value);
    };

    let index = 0;
    const columns = [
        {
            name: "No",
            selector: (row) => ++index,
        },
        {
            name: "Nama",
            selector: (row) => row.nama,
        },
        {
            name: "Nomor Induk",
            selector: (row) => row.nomor_induk,
        },
        {
            name: "Program Studi",
            selector: (row) => row.prodi.nama_prodi,
        },
        {
            name: "Jenis Kelamin",
            selector: (row) => row.jenis_kelamin,
        },
        {
            name: "Action",
            selector: (row) => (
                <div>
                    <button className="bg-blue-400 p-2 rounded-md text-white font-bold mx-1">
                        Update
                    </button>
                    <button className="bg-red-400 p-2 rounded-md text-white font-bold mx-1">
                        Delete
                    </button>
                </div>
            ),
        },
    ];
    return (
        <div>
            <AdminLayout title={"Master Dosen"}>
                <div className=" text-gray-900">
                    <p className="text-lg">Daftar Dosen</p>
                    <span className="text-sm font-bold">
                        Daftar Dosen yang tersedia
                    </span>
                </div>
                <div className="my-2">
                    {data_prodi.map((item) => (
                        <button
                            className={` p-2 rounded-lg mx-1 ${
                                item.id == active
                                    ? "bg-gray-300"
                                    : "bg-gray-200"
                            }`}
                            onClick={() => filterDataDosen(item.id)}
                            key={item.id}
                        >
                            <p className="text-xs">{item.nama_prodi}</p>
                        </button>
                    ))}
                </div>
                <div className="flex justify-end">
                    <Link href={route("user.create")}>
                        <button className="bg-green-400 text-white p-1 rounded-sm w-24 font-bold mx-1">
                            Create
                        </button>
                    </Link>
                </div>
                <DataTable
                    columns={columns}
                    data={dataDosen}
                    fixedHeader
                    pagination
                />
            </AdminLayout>
        </div>
    );
};

export default Dosen;
