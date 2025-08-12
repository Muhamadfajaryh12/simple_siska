import DangerButton from "@/Components/DangerButton";
import FilterColumn from "@/Components/FilterColumn";
import DeleteModal from "@/Components/modal/DeleteModal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useModal } from "@/Context/ModalContext";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaPencil, FaTrash } from "react-icons/fa6";

const Dosen = ({ data, data_prodi, data_fakultas }) => {
    const { showModal, closeModal } = useModal();
    const [filters, setFilters] = useState({
        prodiId: "",
        fakultasId: "",
    });
    const handleDelete = (id) => {
        router.delete(route("dosen.delete", { id: id }), {
            onSuccess: () => {
                data.filter((prev) => prev.id != id);
                closeModal();
            },
        });
    };
    const columns = [
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
            name: "Fakultas",
            selector: (row) => row.fakultas.nama_fakultas,
        },
        {
            name: "Action",
            selector: (row) => (
                <div className="flex gap-2">
                    <SecondaryButton>
                        <Link href={route("dosen.update", { id: row.id })}>
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
        {
            key: "fakultasId",
            label: "nama_fakultas",
            value: "id",
            data: data_fakultas,
        },
    ];

    const updateFilter = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const filterData = data.filter((item) => {
        return filters.prodiId
            ? item.prodi_id == filters.prodiId
            : true && filters.fakultasId
            ? item.fakultas_id == filters.fakultasId
            : true;
    });

    return (
        <div>
            <AdminLayout title={["Dosen", "Daftar"]}>
                <div className="flex justify-between mb-4">
                    <FilterColumn
                        filterData={filterConfig}
                        onChange={updateFilter}
                    />
                    <Link href={route("dosen.create")}>
                        <PrimaryButton>Buat Dosen</PrimaryButton>
                    </Link>
                </div>
                <DataTable
                    columns={columns}
                    data={filterData}
                    fixedHeader
                    pagination
                />
            </AdminLayout>
        </div>
    );
};

export default Dosen;
