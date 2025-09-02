import DangerButton from "@/Components/DangerButton";
import FilterColumn from "@/Components/FilterColumn";
import DeleteModal from "@/Components/modal/DeleteModal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Select from "@/Components/Select";
import SubText from "@/Components/SubText";
import { useModal } from "@/Context/ModalContext";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaPencil, FaTrash } from "react-icons/fa6";

const Mahasiswa = ({ data, data_prodi, data_fakultas }) => {
    const { showModal, closeModal } = useModal();
    const [filters, setFilters] = useState({
        prodiId: "",
        fakultasId: "",
    });

    const handleDelete = (id) => {
        router.delete(route("mahasiswa.delete", { id: id }), {
            onSuccess: () => {
                data.filter((prev) => prev.id != id);
                closeModal();
            },
        });
    };

    const columns = [
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
                <div className="flex gap-2">
                    <SecondaryButton>
                        <Link href={route("mahasiswa.update", row.id)}>
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

    const updateFilter = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const filterData = data.filter((item) => {
        return (
            (filters.fakultasId
                ? item.fakultas.id == filters.fakultasId
                : true) &&
            (filters.prodiId ? item.prodi.id == filters.prodiId : true)
        );
    });

    const filterConfig = [
        {
            key: "fakultasId",
            value: "id",
            label: "nama_fakultas",
            data: data_fakultas,
        },
        {
            key: "prodiId",
            value: "id",
            label: "nama_prodi",
            data: data_prodi,
        },
    ];

    return (
        <div>
            <AdminLayout title={["Mahasiswa", "Daftar"]}>
                <div className="flex justify-between mb-4">
                    <FilterColumn
                        filterData={filterConfig}
                        onChange={updateFilter}
                    />
                    <Link href={route("mahasiswa.create")}>
                        <PrimaryButton>BUAT Mahasiswa</PrimaryButton>
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
            </AdminLayout>
        </div>
    );
};

export default Mahasiswa;
