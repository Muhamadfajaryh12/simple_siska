import SecondaryButton from "@/Components/SecondaryButton";
import SubText from "@/Components/SubText";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import DataTable from "react-data-table-component";
import { FaEye } from "react-icons/fa6";

const KelasPerwalian = ({ data_kelas }) => {
    return (
        <AdminLayout title={["Kelas Perwalian", "Daftar"]}>
            <div className="bg-white rounded-md p-4">
                <SubText text={"Table"} />
                <DataTable
                    data={data_kelas}
                    columns={[
                        {
                            name: "Kelas",
                            selector: (row) => row.kelas,
                        },
                        {
                            name: "Angkatan",
                            selector: (row) => row.angkatan,
                        },
                        {
                            name: "Action",
                            selector: (row) => (
                                <div>
                                    <Link
                                        href={route(
                                            "detail_kelas_perwalian.index",
                                            row.id
                                        )}
                                    >
                                        <SecondaryButton>
                                            <FaEye />
                                        </SecondaryButton>
                                    </Link>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
        </AdminLayout>
    );
};

export default KelasPerwalian;
