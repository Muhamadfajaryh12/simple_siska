import SecondaryButton from "@/Components/SecondaryButton";
import SubText from "@/Components/SubText";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import DataTable from "react-data-table-component";
import { FaEye } from "react-icons/fa6";

const KelasMengajar = ({ data_kelas }) => {
    return (
        <AdminLayout title={["Kelas", "Daftar"]}>
            <div className="p-4 bg-white rounded-md">
                <SubText text={"Table"} />
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
                                <Link href={`/kelas_mengajar/${row.id}`}>
                                    <SecondaryButton>
                                        <FaEye />
                                    </SecondaryButton>
                                </Link>
                            ),
                        },
                    ]}
                    pagination
                />
            </div>
        </AdminLayout>
    );
};

export default KelasMengajar;
