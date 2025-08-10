import DangerButton from "@/Components/DangerButton";
import DeleteModal from "@/Components/modal/DeleteModal";
import SecondaryButton from "@/Components/SecondaryButton";
import { useModal } from "@/Context/ModalContext";
import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import React from "react";
import DataTable from "react-data-table-component";
import { FaPencil, FaTrash } from "react-icons/fa6";

const KelasMataKuliah = ({ data_kelas_mata_kuliah }) => {
    const { showModal, closeModal } = useModal();
    const handleDelete = (id) => [
        router.delete(route("kelas_mata_kuliah.destroy", { id: id }), {
            onSuccess: () => {
                closeModal();
                data_kelas_mata_kuliah.filter((item) => item.id != id);
            },
        }),
    ];
    const colums = [
        {
            name: "Nama Dosen",
            selector: (row) => row.dosen.nama_dosen,
        },
        {
            name: "Mata Kuliah",
            selector: (row) => row.mata_kuliah.nama_mata_kuliah,
        },
        {
            name: "Kelas",
            selector: (row) => row.nama_kelas,
        },
        {
            name: "Tahun Ajaran",
            selector: (row) => row.tahun_ajaran,
        },
        {
            name: "Action",
            selector: (row) => (
                <div className="flex gap-2">
                    <SecondaryButton>
                        <FaPencil />
                    </SecondaryButton>
                    <DangerButton
                        onClick={() =>
                            showModal(
                                <DeleteModal
                                    handleDelete={() => handleDelete(row.id)}
                                />
                            )
                        }
                    >
                        <FaTrash />
                    </DangerButton>
                </div>
            ),
        },
    ];
    return (
        <AdminLayout title={["Kelas Mata Kuliah"]}>
            <DataTable
                data={data_kelas_mata_kuliah}
                columns={colums}
                pagination
            />
        </AdminLayout>
    );
};

export default KelasMataKuliah;
