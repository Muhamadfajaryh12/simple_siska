import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import DataTable from "react-data-table-component";

const Kelas = ({ data_kelas }) => {
    let index = 0;

    const columns = [
        {
            name: "No",
            selector: (row) => ++index,
        },
        {
            name: "kelas",
            selector: (row) => row.nama_kelas,
        },

        {
            name: "Action",
            selector: (row) => (
                <div>
                    <button className="bg-blue-400 p-2 rounded-md text-white font-bold mx-1">
                        <Link href={`/fakultas_update/${row.id}`}>Update</Link>
                    </button>
                    <button
                        className="bg-red-400 p-2 rounded-md text-white font-bold mx-1"
                        onClick={() => setShowModal(true)}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];
    return (
        <AdminLayout>
            <div className=" text-gray-900">
                <p className="text-lg">Daftar Kelas</p>
                <span className="text-sm font-bold">
                    Daftar Kelas yang tersedia
                </span>
            </div>
            <div className="flex justify-end">
                <Link href={route("kelas.create")}>
                    <button className="bg-green-400 text-white p-1 rounded-sm w-24 font-bold mx-1">
                        Create
                    </button>
                </Link>
            </div>
            <DataTable
                columns={columns}
                data={data_kelas}
                fixedHeader
                pagination
            />
        </AdminLayout>
    );
};

export default Kelas;
