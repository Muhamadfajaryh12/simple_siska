import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "@inertiajs/react";
import { useModal } from "@/Context/ModalContext";
import DeleteModal from "@/Components/modal/DeleteModal";
const Fakultas = () => {
    const { data } = usePage().props;
    const { showModal } = useModal();
    let index = 0;

    const columns = [
        {
            name: "No",
            selector: (row) => ++index,
        },
        {
            name: "Fakultas",
            selector: (row) => row.nama_fakultas,
        },
        {
            name: "Kode Fakultas",
            selector: (row) => row.kode_fakultas,
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
                        onClick={() => showModal(<DeleteModal />)}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout title={["Fakultas", "Table"]}>
            <div className=" text-gray-900">
                <p className="text-lg">Daftar Fakultas</p>
                <span className="text-sm font-bold">
                    Daftar Fakultas yang tersedia
                </span>
            </div>
            <div className="flex justify-end">
                <Link href={route("fakultas.create")}>
                    <button className="bg-green-400 text-white p-1 rounded-sm w-24 font-bold mx-1">
                        Create
                    </button>
                </Link>
            </div>
            <DataTable columns={columns} data={data} fixedHeader pagination />
        </AdminLayout>
    );
};

export default Fakultas;
