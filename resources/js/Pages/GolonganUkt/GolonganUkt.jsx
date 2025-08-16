import FilterColumn from "@/Components/FilterColumn";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Select from "@/Components/Select";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaPencil } from "react-icons/fa6";

const GolonganUkt = ({ data_golongan_ukt, data_prodi }) => {
    const [filters, setFilters] = useState({
        prodiId: "",
    });

    const filterData = data_golongan_ukt.filter((item) => {
        return filters.prodiId ? item.prodi_id == filters.prodiId : true;
    });

    const UpdateFilter = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const filterConfig = [
        {
            key: "prodiId",
            value: "id",
            label: "nama_prodi",
            data: data_prodi,
        },
    ];
    return (
        <AdminLayout title={["Golongan UKT", "Daftar"]}>
            <div className="flex justify-between mb-4">
                <FilterColumn
                    filterData={filterConfig}
                    onChange={UpdateFilter}
                />
                <Link href="/golongan_ukt/form">
                    <PrimaryButton>Buat Golongan UKT</PrimaryButton>
                </Link>
            </div>
            <DataTable
                data={filterData}
                columns={[
                    {
                        name: "Golongan",
                        selector: (row) => row.golongan,
                    },
                    {
                        name: "Nominal",
                        selector: (row) => row.nominal,
                    },
                    {
                        name: "Program Studi",
                        selector: (row) => row.prodi.nama_prodi,
                    },
                    {
                        name: "Action",
                        selector: (row) => (
                            <Link>
                                <SecondaryButton>
                                    <FaPencil />
                                </SecondaryButton>
                            </Link>
                        ),
                    },
                ]}
                pagination
            />
        </AdminLayout>
    );
};

export default GolonganUkt;
