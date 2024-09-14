import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const KrsPenilaian = ({ data_krs }) => {
    const { data, setData, processing, post } = useForm({
        data_verifikasi: [],
    });

    useEffect(() => {
        setData(
            "data_verifikasi",
            data_krs.map((item) => ({ id: item.id, nilai: "" }))
        );
    }, [data_krs]);

    const submit = () => {
        post(route("krs.penilaian"));
    };

    const handleInputChange = (index, e) => {
        const updatedVerifikasi = [...data.data_verifikasi];
        updatedVerifikasi[index].nilai = e.target.value;
        setData("data_verifikasi", updatedVerifikasi);
    };
    const columns = [
        {
            name: "Mata Kuliah",
            selector: (row) => row.mata_kuliah.nama_mata_kuliah,
        },
        {
            name: "Semester",
            selector: (row) => row.mata_kuliah.semester,
        },
        {
            name: "Kelas",
            selector: (row) => row.mata_kuliah.kelas.nama_kelas,
        },
        {
            name: "Jadwal",
            selector: (row) => (
                <p>
                    <span className="font-bold">{row.mata_kuliah.jadwal}</span>{" "}
                    ({row.mata_kuliah.jam_mulai.replace(/:00$/, "")} - {""}
                    {row.mata_kuliah.jam_selesai.replace(/:00$/, "")})
                </p>
            ),
        },
        {
            name: "Dosen Pengampu",
            selector: (row) => row.mata_kuliah.dosen.nama,
        },
        {
            name: "SKS",
            selector: (row) => row.mata_kuliah.sks,
        },
        {
            name: "Nilai",
            selector: (row, index) => (
                <TextInput
                    key={index}
                    name="nilai"
                    type="number"
                    className="w-full"
                    value={data.data_verifikasi[index]?.nilai || ""}
                    onChange={(e) => handleInputChange(index, e)}
                />
            ),
        },
    ];

    let totalSKS = data_krs?.reduce(
        (acc, item) => acc + item?.mata_kuliah.sks,
        0
    );
    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-1">
                    <div className="p-6 text-gray-900">
                        <div className="flex justify-between">
                            <p className="text-lg">Kartu Rencana Studi</p>
                        </div>
                        <span className="text-sm font-bold">
                            Berikut adalah Kartu Rencana Studi yang diajukan
                        </span>
                        <p>Nama Mahasiswa : {data_krs[0]?.mahasiswa?.nama}</p>
                    </div>
                    <div className="p-6">
                        <DataTable
                            fixedHeader
                            columns={columns}
                            data={data_krs}
                        />
                        <div className="flex justify-end">
                            <div className="my-2">
                                <h6 className="text-sm font-bold mt-2">
                                    Total SKS : {totalSKS}
                                </h6>
                                <PrimaryButton
                                    disabled={processing}
                                    onClick={submit}
                                >
                                    Selesai
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default KrsPenilaian;
