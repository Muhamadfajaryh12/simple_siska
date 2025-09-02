import DangerButton from "@/Components/DangerButton";
import FilterColumn from "@/Components/FilterColumn";
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

const KelasMataKuliah = ({ data_kelas_mata_kuliah, data_prodi }) => {
    const { showModal, closeModal } = useModal();
    const [filters, setFilters] = useState({
        prodiId: "",
    });
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
            name: "Program Studi",
            selector: (row) => row.mata_kuliah.prodi.nama_prodi,
        },
        {
            name: "Tahun Ajaran",
            selector: (row) => row.tahun_ajaran,
        },
        {
            name: "Action",
            selector: (row) => (
                <div className="flex gap-2">
                    <Link href={route("kelas_mata_kuliah.update", row.id)}>
                        <SecondaryButton>
                            <FaPencil />
                        </SecondaryButton>
                    </Link>
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

    const filterData = data_kelas_mata_kuliah.filter((prev) => {
        return filters?.prodiId
            ? prev.mata_kuliah.prodi.id == filters.prodiId
            : true;
    });
    return (
        <AdminLayout title={["Kelas Mata Kuliah", "Daftar"]}>
            <div className="flex justify-between mb-4">
                <FilterColumn
                    filterData={filterConfig}
                    onChange={updateFilter}
                />
                <Link href={route("kelas_mata_kuliah.create")}>
                    <PrimaryButton>Buat Kelas Perkuliahan</PrimaryButton>
                </Link>
            </div>
            <div className="p-4 bg-white rounded-md">
                <SubText text={"Table"} />
                <DataTable data={filterData} columns={colums} pagination />
            </div>
        </AdminLayout>
    );
};

export default KelasMataKuliah;
