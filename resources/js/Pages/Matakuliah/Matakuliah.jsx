import Modal from "@/Components/Modal";
import DeleteModal from "@/Components/modal/DeleteModal";
import { useModal } from "@/Context/ModalContext";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaPencil, FaTrash } from "react-icons/fa6";

const Matakuliah = ({ data }) => {
    const { showModal, closeModal } = useModal();

    const handleDelete = (id) => {
        router.delete(route("mata_kuliah.destroy", { id: id }), {
            onSuccess: () => {
                data.filter((prev) => prev.id !== id);
                closeModal();
            },
        });
    };

    const columns = [
        {
            name: "Kode MK",
            selector: (row) => row.kode_mata_kuliah,
        },
        {
            name: "Mata Kuliah",
            selector: (row) => row.nama_mata_kuliah,
        },
        {
            name: "SKS",
            selector: (row) => row.sks,
        },
        {
            name: "Program Studi",
            selector: (row) => row.prodi.nama_prodi,
        },

        {
            name: "Action",
            selector: (row) => (
                <div className="flex gap-1">
                    <button className="bg-blue-400 p-2 rounded-md text-white font-bold mx-1">
                        <Link href={`/mata_kuliah/form/${row.id}`}>
                            <FaPencil />
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
                        <FaTrash />
                    </button>
                </div>
            ),
        },
    ];
    return (
        <AdminLayout title={["Mata Kuliah", "Data"]}>
            <div className=" text-gray-900">
                <p className="text-lg">Daftar Mata Kuliah</p>
                <span className="text-sm font-bold">
                    Data Mata Kuliah yang tersedia
                </span>
            </div>
            <div className="">
                <div className="flex justify-end">
                    <Link href={route("matakuliah.create")}>
                        <button className="bg-green-400 text-white p-1 rounded-sm w-24 font-bold mx-1 ">
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
            </div>
        </AdminLayout>
    );
};

export default Matakuliah;
