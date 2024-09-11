import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const KrsMahasiswa = ({ auth, datas }) => {
    const [dataMK, setDataMK] = useState([]);
    const [lengthData, setLengthData] = useState(0);
    const handleSelect = (state) => {
        setLengthData(state.selectedRows);
    };
    const { data, setData, post, processing } = useForm({
        mata_kuliah: lengthData,
    });

    useEffect(() => {
        let data_filter = Object.groupBy(datas, (mk) => mk.semester);
        setDataMK(data_filter[1]);
    }, [datas]);

    useEffect(() => {
        setData("mata_kuliah", lengthData);
    }, [lengthData]);

    const filterData = (param) => {
        let data_filter = Object.groupBy(datas, (mk) => mk.semester);
        setDataMK(data_filter[param]);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("krs_mahasiswa.store"));
    };

    const dataSemester = [
        {
            id: "1",
            name: "Semester 1",
        },
        {
            id: "2",
            name: "Semester 2",
        },
        {
            id: "3",
            name: "Semester 3",
        },
        {
            id: "4",
            name: "Semester 4",
        },
        {
            id: "5",
            name: "Semester 5",
        },
        {
            id: "6",
            name: "Semester 6",
        },
        {
            id: "7",
            name: "Semester 7",
        },
        {
            id: "8",
            name: "Semester 8",
        },
    ];
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
            name: "Program Studi",
            selector: (row) => row.prodi.nama_prodi,
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
                    <Select
                        data={dataSemester}
                        valueField="id"
                        labelField="name"
                        className="mb-2"
                        onChange={(e) => filterData(e.target.value)}
                    />
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
                            data={dataMK}
                            selectableRows
                            className="my-4"
                            onSelectedRowsChange={handleSelect}
                        />
                    </div>
                    <PrimaryButton
                        className="mt-2"
                        onClick={submit}
                        disabled={processing}
                    >
                        DIAMBIL ({lengthData?.length})
                    </PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default KrsMahasiswa;
