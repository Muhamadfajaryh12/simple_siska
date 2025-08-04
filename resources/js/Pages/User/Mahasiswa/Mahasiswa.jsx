import DeleteModal from "@/Components/modal/DeleteModal";
import { useModal } from "@/Context/ModalContext";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaPencil, FaTrash } from "react-icons/fa6";

const Mahasiswa = ({ data }) => {
    const { showModal, closeModal } = useModal();
    const handleDelete = (id) => {
        router.delete(route("mahasiswa.delete", { id: id }), {
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
            selector: (row) => row.nama_mahasiswa,
        },
        {
            name: "Nomor Induk",
            selector: (row) => row.nim,
        },
        {
            name: "Program Studi",
            selector: (row) => row.prodi.nama_prodi,
        },
        {
            name: "Fakultas",
            selector: (row) => row.fakultas.nama_fakultas,
        },
        {
            name: "Angkatan",
            selector: (row) => row.angkatan,
        },
        {
            name: "Action",
            selector: (row) => (
                <div className="flex">
                    <Link
                        href={`/mahasiswa/form/${row.id}`}
                        className="bg-blue-400 p-2 text-center rounded-md text-white font-bold mx-1"
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
            <AdminLayout title={["Mahasiswa", "Data"]}>
                <div className=" text-gray-900">
                    <p className="text-lg">Daftar Mahasiswa</p>
                    <span className="text-sm font-bold">
                        Data Mahasiswa yang tersedia
                    </span>
                </div>

                <div className="flex justify-end">
                    <Link href={route("mahasiswa.create")}>
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

export default Mahasiswa;
