import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "react-data-table-component";

const KrsMahasiswa = ({ auth, data }) => {
    const [lengthData, setLengthData] = useState(null);
    let datas = Object.groupBy(data, (mk) => mk.semester);
    const handleSelect = (state) => {
        setLengthData(state.selectedRows);
    };
    const colums = [
        {
            name: "Mata Kuliah",
            selector: (row) => row.nama_mata_kuliah,
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
                    {row.jam_mulai.replace(/:00$/, "")} - {""}
                    {row.jam_selesai.replace(/:00$/, "")})
                </p>
            ),
        },
        {
            name: "Kelas",
            selector: (row) => row.kelas.nama_kelas,
        },
        {
            name: "Semester",
            selector: (row) => row.semester,
        },
        {
            name: "Dosen Pengampu",
            selector: (row) => row.dosen.nama,
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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-1">
                        <div className="p-6 text-gray-900">
                            <p className="text-lg">Susunan Mata Kuliah</p>
                            <span className="text-sm font-bold">
                                Silahkan pilih Mata Kuliah yang akan diambil!
                            </span>
                        </div>
                        <DataTable
                            fixedHeader
                            columns={colums}
                            data={datas[2]}
                            selectableRows
                            className="my-4"
                            onSelectedRowsChange={handleSelect}
                        />
                    </div>
                    <PrimaryButton className="mt-2">
                        DIAMBIL ({lengthData?.length})
                    </PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default KrsMahasiswa;
