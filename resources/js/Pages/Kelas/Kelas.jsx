import DeleteModal from "@/Components/modal/DeleteModal";
import { useModal } from "@/Context/ModalContext";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import React from "react";
import DataTable from "react-data-table-component";
import { FaEye, FaPencil, FaTrash } from "react-icons/fa6";

const Kelas = ({ data_kelas }) => {
    let index = 0;

    const { showModal, closeModal } = useModal();

    const handleDelete = (id) => {
        router.delete(route("kelas.destroy", { id: id }), {
            onSuccess: () => {
                data_kelas.filter((prev) => prev.id != id);
                closeModal();
            },
        });
    };

    const columns = [
        {
            name: "No",
            selector: (row) => ++index,
        },
        {
            name: "kelas",
            selector: (row) => row.kelas,
        },
        {
            name: "Dosen Wali",
            selector: (row) => row.dosen.nama_dosen,
        },
        {
            name: "Program Studi",
            selector: (row) => row.prodi.nama_prodi,
        },
        {
            name: "Angkatan",
            selector: (row) => row.angkatan,
        },
        {
            name: "Action",
            selector: (row) => (
                <div className="flex gap-2 items-center">
                    <Link
                        href={`/kelas/${row.id}`}
                        className="p-2 rounded-md bg-gray-300"
                    >
                        <FaEye />
                    </Link>
                    <button className="bg-blue-600 p-2 rounded-md text-white font-bold ">
                        <Link href={`/kelas/form/${row.id}`}>
                            <FaPencil />
                        </Link>
                    </button>
                    <button
                        className="bg-red-600 p-2 rounded-md text-white font-bold "
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
