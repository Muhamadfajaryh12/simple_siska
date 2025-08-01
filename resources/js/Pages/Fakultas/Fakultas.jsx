import AdminLayout from "@/Layouts/AdminLayout";
import { router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "@inertiajs/react";
import { useModal } from "@/Context/ModalContext";
import DeleteModal from "@/Components/modal/DeleteModal";
import { FaPencil, FaTrash } from "react-icons/fa6";
const Fakultas = ({ data }) => {
    const { showModal, closeModal } = useModal();
    let index = 0;

    const handleDelete = (id) => {
        router.delete(route("fakultas.destroy", { id: id }), {
            onSuccess: () => {
                closeModal(), data.filter((item) => item.id != id);
            },
        });
    };

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
                        <Link href={`/fakultas/form/${row.id}`}>
                            <FaPencil size={15} />
                        </Link>
                    </button>
                    <button
                        className="bg-red-400 p-2 rounded-md text-white font-bold mx-1"
                        onClick={() =>
                            showModal(
                                <DeleteModal
                                    handleDelete={() => handleDelete(row.id)}
                                />
                            )
                        }
                    >
                        <FaTrash size={15} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout title={["Fakultas", "Daftar"]}>
            <div className=" text-gray-900">
                <p className="text-lg">Daftar Fakultas</p>
                <span className="text-sm font-bold">
                    Daftar Fakultas yang tersedia
                </span>
            </div>
            <div className="flex justify-end">
                <Link href={route("fakultas.create")}>
                    <button className="bg-black text-white p-2 rounded-md text-sm font-bold mx-1">
                        Menambah Fakultas
                    </button>
                </Link>
            </div>
            <DataTable columns={columns} data={data} fixedHeader pagination />
        </AdminLayout>
    );
};

export default Fakultas;
