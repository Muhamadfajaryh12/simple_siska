import FilterColumn from "@/Components/FilterColumn";
import StatusButton from "@/Components/StatusButton";
import AdminLayout from "@/Layouts/AdminLayout";
import React, { useState } from "react";
import DataTable from "react-data-table-component";

const TagihanUkt = ({ data_tagihan_ukt, data_prodi, data_semester_ajaran }) => {
    const [filters, setFilters] = useState({
        prodi_id: "",
        semester_ajaran_id: "",
    });

    const filterConfig = [
        {
            key: "prodi_id",
            data: data_prodi,
            value: "id",
            label: "nama_prodi",
        },
        {
            key: "semester_ajaran_id",
            data: data_semester_ajaran,
            value: "id",
            label: "semester_ajaran",
        },
    ];

    const updateFilter = (key, value) => {
        setFilters((...prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const dataFilter = data_tagihan_ukt.filter((item) => {
        return (
            (filters.prodi_id
                ? item.mahasiswa.prodi_id == filters.prodi_id
                : true) &&
            (filters.semester_ajaran_id
                ? item.semester_ajaran_id == filters.semester_ajaran_id
                : true)
        );
    });

    return (
        <AdminLayout title={["UKT", "Mahasiswa", "Daftar"]}>
            <div className="mb-4">
                <FilterColumn
                    filterData={filterConfig}
                    onChange={updateFilter}
                />
            </div>
            <DataTable
                data={dataFilter || []}
                columns={[
                    {
                        name: "NIM",
                        selector: (row) => row.mahasiswa.nim,
                    },
                    {
                        name: "Mahasiwa",
                        selector: (row) => row.mahasiswa.nama_mahasiswa,
                    },
                    {
                        name: "Program Studi",
                        selector: (row) => row.mahasiswa.prodi.nama_prodi,
                    },
                    {
                        name: "Semester Ajaran",
                        selector: (row) => row.semester_ajaran.semester_ajaran,
                    },
                    {
                        name: "Status",
                        selector: (row) => (
                            <StatusButton>{row.status}</StatusButton>
                        ),
                    },
                ]}
                pagination
            />
        </AdminLayout>
    );
};

export default TagihanUkt;
