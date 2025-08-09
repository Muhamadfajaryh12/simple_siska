import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import DataTable from "react-data-table-component";

const KrsMahasiswa = ({ auth, data_mata_kuliah }) => {
    const { data, setData, post, processing } = useForm({
        total_sks: "",
        semester: "",
        mata_kuliah: [],
    });

    const handleSelect = (state) => {
        const payload = state.selectedRows.map((item) => ({
            mata_kuliah_id: item.id,
        }));

        const countTotalSks = state.selectedRows.reduce(
            (sum, item) => sum + item.sks,
            0
        );

        setData({
            mata_kuliah: payload,
            total_sks: countTotalSks,
            semester: "1",
        });
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("krs_mahasiswa.store"));
    };

    const colums = [
        {
            name: "Mata Kuliah",
            selector: (row) => row.nama_mata_kuliah,
        },
        {
            name: "Kode Mata Kuliah",
            selector: (row) => row.kode_mata_kuliah,
        },
        {
            name: "SKS",
            selector: (row) => row.sks,
        },
        {
            name: "Jadwal",
            selector: (row) => (
                <p>
                    <span className="font-bold">{row.jadwal}</span> (
                    {row.jam_mulai}-{row.jam_selesai})
                </p>
            ),
        },
        {
            name: "Kelas",
            selector: (row) => row.kelas,
        },
        {
            name: "Semester",
            selector: (row) => row.semester,
        },
        {
            name: "Program Studi",
            selector: (row) => row.prodi.nama_prodi,
        },
        {
            name: "Dosen Pengampu",
            selector: (row) => row.dosen.nama_dosen,
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Kartu Rencana Studi
                </h2>
            }
        >
            <Head title="Kartu Rencana Studi" />

            <div className="p-6 text-gray-900">
                <p className="text-lg">Susunan Mata Kuliah</p>
                <span className="text-sm font-bold">
                    Silahkan pilih Mata Kuliah yang akan diambil!
                </span>
            </div>
            <DataTable
                fixedHeader
                columns={colums}
                data={data_mata_kuliah}
                selectableRows
                className="my-4"
                onSelectedRowsChange={handleSelect}
            />

            <PrimaryButton
                className="m-2"
                onClick={submit}
                disabled={processing}
            >
                DIAMBIL ({data.mata_kuliah.length})
            </PrimaryButton>
        </AuthenticatedLayout>
    );
};

export default KrsMahasiswa;
