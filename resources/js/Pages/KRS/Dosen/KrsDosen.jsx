import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import DataTable from "react-data-table-component";

const KrsDosen = ({ data }) => {
    console.log(data);
    const columns = [
        {
            name: "Nama",
            selector: (row) => row.nama,
        },
        {
            name: "Semester",
            selector: (row) => row.semester,
        },
        {
            name: "Program Studi",
            selector: (row) => row.nama_prodi,
        },
        {
            name: "Verifikasi",
            selector: (row) => (
                <Link href={`/verifkasi_krs/${row.id_user}/${row.semester}`}>
                    <button className="bg-green-400 text-white font-bold p-2 rounded-md">
                        Lakukan Verifikasi
                    </button>
                </Link>
            ),
        },
    ];
    return (
        <AdminLayout title={"Verifikasi KRS"}>
            <DataTable data={data} columns={columns} />
        </AdminLayout>
    );
};

export default KrsDosen;
