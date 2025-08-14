import SecondaryButton from "@/Components/SecondaryButton";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import DataTable from "react-data-table-component";
import { FaEye } from "react-icons/fa6";

const KelasMengajar = ({ data_kelas }) => {
    return (
        <AdminLayout title={["Kelas", "Daftar"]}>
            <DataTable
                data={data_kelas}
                columns={[
                    { name: "Kelas", selector: (row) => row.nama_kelas },
                    {
                        name: "Mata Kuliah",
                        selector: (row) => row.mata_kuliah.nama_mata_kuliah,
                    },
                    {
                        name: "Semester",
                        selector: (row) => row.mata_kuliah.semester,
                    },
                    {
                        name: "SKS",
                        selector: (row) => row.mata_kuliah.sks,
                    },
                    {
                        name: "Tahun Ajaran",
                        selector: (row) => row.tahun_ajaran,
                    },
                    {
                        name: "Action",
                        selector: (row) => (
                            <SecondaryButton>
                                <Link href={`/kelas_mengajar/${row.id}`}>
                                    <FaEye />
                                </Link>
                            </SecondaryButton>
                        ),
                    },
                ]}
                pagination
            />
        </AdminLayout>
    );
};

export default KelasMengajar;
