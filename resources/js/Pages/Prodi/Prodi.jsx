import AdminLayout from "@/Layouts/AdminLayout";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Link, router } from "@inertiajs/react";
import { useModal } from "@/Context/ModalContext";
import DeleteModal from "@/Components/modal/DeleteModal";
import { FaPencil, FaTrash } from "react-icons/fa6";
import PrimaryButton from "@/Components/PrimaryButton";
import FilterColumn from "@/Components/FilterColumn";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SubText from "@/Components/SubText";
const Prodi = ({ data, data_fakultas }) => {
    const { showModal, closeModal } = useModal();
    const [filters, setFilters] = useState({
        fakultasId: "",
    });

    const handleDelete = (id) => {
        router.delete(
            "prodi.destroy",
            { id: id },
            {
                onSuccess: () => {
                    data.filter((item) => item.id != id);
                    closeModal();
                },
            }
        );
    };

    const columns = [
        {
            name: "Prodi",
            selector: (row) => row.nama_prodi,
        },
        {
            name: "Kode Prodi",
            selector: (row) => row.kode_prodi,
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
                        <Link href={route("prodi.update", row.id)}>
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

    const filterConfig = [
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
        return filters.fakultasId
            ? item.fakultas_id == filters.fakultasId
            : true;
    });
    return (
        <>
            <AdminLayout title={["Program Studi", "Daftar"]}>
                <div className="flex justify-between my-4">
                    <FilterColumn
                        filterData={filterConfig}
                        onChange={updateFilter}
                    />
                    <Link href={route("prodi.create")}>
                        <PrimaryButton>Buat Program Studi</PrimaryButton>
                    </Link>
                </div>

                <div className="p-4 bg-white rounded-md">
                    <SubText text="Table" />
                    <DataTable
                        columns={columns}
                        data={filterData}
                        fixedHeader
                        pagination
                    />
                </div>
            </AdminLayout>
        </>
    );
};

export default Prodi;
