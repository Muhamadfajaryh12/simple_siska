import DangerButton from "@/Components/DangerButton";
import FilterColumn from "@/Components/FilterColumn";
import Modal from "@/Components/Modal";
import DeleteModal from "@/Components/modal/DeleteModal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SubText from "@/Components/SubText";
import { useModal } from "@/Context/ModalContext";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaPencil, FaTrash } from "react-icons/fa6";

const Matakuliah = ({ data, data_prodi }) => {
    const { showModal, closeModal } = useModal();
    const [filters, setFilters] = useState({
        prodiId: "",
    });
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
                <div className="flex gap-2">
                    <SecondaryButton>
                        <Link href={route("mata_kuliah.update", row.id)}>
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

    const filterData = data.filter((item) => {
        return filters.prodiId ? item.prodi_id == filters.prodiId : true;
    });
    return (
        <AdminLayout title={["Mata Kuliah", "Daftar"]}>
            <div className="rounded-md">
                <div className="flex justify-between mb-4">
                    <FilterColumn
                        filterData={filterConfig}
                        onChange={updateFilter}
                    />
                    <Link href={route("matakuliah.create")}>
                        <PrimaryButton>BUAT MATA KULIAH</PrimaryButton>
                    </Link>
                </div>
                <div className="p-4 bg-white rounded-md">
                    <SubText text={"Table"} />
                    <DataTable
                        columns={columns}
                        data={filterData}
                        fixedHeader
                        pagination
                    />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Matakuliah;
