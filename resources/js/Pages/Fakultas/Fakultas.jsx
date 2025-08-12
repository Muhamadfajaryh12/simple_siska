import AdminLayout from "@/Layouts/AdminLayout";
import { router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "@inertiajs/react";
import { useModal } from "@/Context/ModalContext";
import DeleteModal from "@/Components/modal/DeleteModal";
import { FaPencil, FaTrash } from "react-icons/fa6";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
const Fakultas = ({ data }) => {
    const { showModal, closeModal } = useModal();

    const handleDelete = (id) => {
        router.delete(route("fakultas.destroy", { id: id }), {
            onSuccess: () => {
                closeModal(), data.filter((item) => item.id != id);
            },
        });
    };

    const columns = [
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
                <div className="flex gap-2">
                    <SecondaryButton>
                        <Link href={`/fakultas/form/${row.id}`}>
                            <FaPencil size={15} />
                        </Link>
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
                        <FaTrash size={15} />
                    </DangerButton>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout title={["Fakultas", "Daftar"]}>
            <div className="flex justify-end">
                <Link href={route("fakultas.create")}>
                    <PrimaryButton>Buat Fakultas</PrimaryButton>
                </Link>
            </div>
            <DataTable columns={columns} data={data} fixedHeader pagination />
        </AdminLayout>
    );
};

export default Fakultas;
