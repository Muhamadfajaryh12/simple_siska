import DeleteModal from "@/Components/modal/DeleteModal";
import { useModal } from "@/Context/ModalContext";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaPencil, FaTrash } from "react-icons/fa6";

const Dosen = ({ data }) => {
    const { showModal, closeModal } = useModal();
    const handleDelete = (id) => {
        router.delete(route("dosen.delete", { id: id }), {
            onSuccess: () => {
                data.filter((prev) => prev.id != id);
                closeModal();
            },
        });
    };
    let index = 0;
    const columns = [
        {
            name: "No",
            selector: (row) => ++index,
        },
        {
            name: "Nama",
            selector: (row) => row.nama_dosen,
        },
        {
            name: "NIP",
            selector: (row) => row.nip,
        },
        {
            name: "Program Studi",
            selector: (row) => row.prodi.nama_prodi,
        },

        {
            name: "Action",
            selector: (row) => (
                <div className="flex gap-1">
                    <Link
                        href={route("dosen.update", { id: row.id })}
                        className="bg-blue-400 p-2 rounded-md text-white font-bold mx-1"
                    >
                        <FaPencil />
                    </Link>
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
                        <FaTrash />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <AdminLayout title={["Dosen", "Data"]}>
                <div className=" text-gray-900">
                    <p className="text-lg">Daftar Dosen</p>
                    <span className="text-sm font-bold">
                        Data Dosen yang tersedia
                    </span>
                </div>

                <div className="flex justify-end">
                    <Link href={route("dosen.create")}>
                        <button className="bg-green-400 text-white p-1 rounded-sm w-24 font-bold mx-1">
                            Create
                        </button>
                    </Link>
                </div>
                <DataTable
                    columns={columns}
                    data={data}
                    fixedHeader
                    pagination
                />
            </AdminLayout>
        </div>
    );
};

export default Dosen;
