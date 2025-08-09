import PrimaryButton from "@/Components/PrimaryButton";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import DataTable from "react-data-table-component";

const KrsDosen = ({ data_krs }) => {
    const columns = [
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
                row.status == `Menunggu` ? (
                    <Link href={`/krs/verifikasi/${row.id}`}>
                        <button className="bg-green-400 text-white font-bold p-2 rounded-md">
                            Lakukan Verifikasi
                        </button>
                    </Link>
                ) : (
                    <PrimaryButton>{row.status}</PrimaryButton>
                ),
        },
    ];
    return (
        <AdminLayout title={["Kartu Rencana Studi", "Verifikasi"]}>
            <div className=" text-gray-900">
                <p className="text-lg">Daftar Kartu Rencana Studi</p>
                <span className="text-sm font-bold">
                    Daftar Kartu Rencana Studi yang tersedia
                </span>
            </div>

            <DataTable data={data_krs} columns={columns} pagination />
        </AdminLayout>
    );
};

export default KrsDosen;
