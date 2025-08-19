import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import StatusButton from "@/Components/StatusButton";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import DataTable from "react-data-table-component";

const KrsDosen = ({ data_krs }) => {
    const columns = [
        {
            name: "NIM",
            selector: (row) => row.mahasiswa.nim,
        },
        {
            name: "Nama",
            selector: (row) => row.mahasiswa.nama_mahasiswa,
        },
        {
            name: "Semester",
            selector: (row) => row.semester,
        },
        {
            name: "Total SKS",
            selector: (row) => row.total_sks,
        },
        {
            name: "Tahun Ajaran",
            selector: (row) => row.tahun_ajaran,
        },
        {
            name: "Action",
            selector: (row) =>
                row.status == `menunggu` ? (
                    <Link href={`/krs/verifikasi/${row.id}`}>
                        <SecondaryButton>Verifikasi</SecondaryButton>
                    </Link>
                ) : (
                    <StatusButton>{row.status}</StatusButton>
                ),
        },
    ];
    return (
        <AdminLayout title={["Kartu Rencana Studi", "Daftar"]}>
            <DataTable data={data_krs} columns={columns} pagination />
        </AdminLayout>
    );
};

export default KrsDosen;
