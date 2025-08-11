import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import DataTable from "react-data-table-component";
import { FaPencil } from "react-icons/fa6";

const NilaiDosen = ({ data_kelas_mata_kuliah }) => {
    const columns = [
        {
            name: "Kelas",
            selector: (row) => row.nama_kelas,
        },
        {
            name: "Tahun Ajaran",
            selector: (row) => row.tahun_ajaran,
        },
        {
            name: "Mata Kuliah",
            selector: (row) => row.mata_kuliah.nama_mata_kuliah,
        },
        {
            name: "Action",
            selector: (row) => (
                <Link href={`/nilai/${row.id}`}>
                    <SecondaryButton>
                        <FaPencil />
                    </SecondaryButton>
                </Link>
            ),
        },
    ];

    return (
        <AdminLayout title={["Kelas Mata Kuliah", "Nilai", "Data"]}>
            <DataTable columns={columns} data={data_kelas_mata_kuliah} />
        </AdminLayout>
    );
};

export default NilaiDosen;
