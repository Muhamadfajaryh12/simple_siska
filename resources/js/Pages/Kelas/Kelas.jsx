import DangerButton from "@/Components/DangerButton";
import FilterColumn from "@/Components/FilterColumn";
import DeleteModal from "@/Components/modal/DeleteModal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useModal } from "@/Context/ModalContext";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaEye, FaPencil, FaTrash } from "react-icons/fa6";

const Kelas = ({ data_kelas, data_prodi }) => {
    const { showModal, closeModal } = useModal();
    const [filters, setFilters] = useState({
        prodiId: "",
    });

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
                    <SecondaryButton>
                        <Link href={`/kelas/${row.id}`}>
                            <FaEye />
                        </Link>
                    </SecondaryButton>
                    <SecondaryButton>
                        <Link href={`/kelas/form/${row.id}`}>
                            <FaPencil />
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
                        <FaTrash />
                    </DangerButton>
                </div>
            ),
        },
    ];

    const filterConfig = [
        {
            key: "prodiId",
            label: "nama_prodi",
            value: "id",
            data: data_prodi,
        },
    ];

    const updateFilter = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    const filterData = data_kelas.filter((prev) => {
        return filters?.prodiId ? prev.prodi.id == filters.prodiId : true;
    });
    return (
        <AdminLayout title={["Kelas", "Daftar"]}>
            <div className="flex justify-between mb-4">
                <FilterColumn
                    filterData={filterConfig}
                    onChange={updateFilter}
                />
                <Link href={route("kelas.create")}>
                    <PrimaryButton>Buat Kelas</PrimaryButton>
                </Link>
            </div>
            <DataTable
                columns={columns}
                data={filterData}
                fixedHeader
                pagination
            />
        </AdminLayout>
    );
};

export default Kelas;
