import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const KrsVerifikasi = ({ data_krs, data_mahasiswa }) => {
    const { data, setData, processing, put } = useForm({
        status: "",
    });

    const submit = (status) => {
        console.log(status);
        setData("status", status);
        put(route("krs.verifikasi", { id: data_mahasiswa.id }));
    };

    const columns = [
        {
            name: "Mata Kuliah",
            selector: (row) =>
                row.kelas_mata_kuliah.mata_kuliah.nama_mata_kuliah,
        },
        {
            name: "Semester",
            selector: (row) => row.kelas_mata_kuliah.mata_kuliah.semester,
        },
        {
            name: "Kelas",
            selector: (row) => row.kelas_mata_kuliah.nama_kelas,
        },
        {
            name: "Jadwal",
            selector: (row) => (
                <p>
                    <span className="font-bold">
                        {row.kelas_mata_kuliah.jadwal}
                    </span>{" "}
                    ({row.kelas_mata_kuliah.jam_mulai.replace(/:00$/, "")} -{" "}
                    {""}
                    {row.kelas_mata_kuliah.jam_selesai.replace(/:00$/, "")})
                </p>
            ),
        },
        {
            name: "Dosen Pengampu",
            selector: (row) => row.kelas_mata_kuliah.dosen.nama_dosen,
        },
        {
            name: "SKS",
            selector: (row) => row.kelas_mata_kuliah.mata_kuliah.sks,
        },
    ];

    return (
        <AdminLayout title={["Kartu Rencana Studi", "Verifikasi"]}>
            <p>Nama Mahasiswa : {data_mahasiswa.mahasiswa.nama_mahasiswa} </p>

            <DataTable fixedHeader columns={columns} data={data_krs} />
            <div className="flex justify-end">
                <div className="my-2">
                    <h6 className="text-sm font-bold mt-2">
                        Total SKS : {data_mahasiswa.total_sks || 0}
                    </h6>
                    {data_mahasiswa.status == "menunggu" ? (
                        <div className="flex gap-2">
                            <DangerButton
                                disabled={processing}
                                className="mt-4"
                                onClick={() => submit("ditolak")}
                            >
                                Tolak
                            </DangerButton>
                            <PrimaryButton
                                disabled={processing}
                                className="mt-4"
                                onClick={() => submit("disetujui")}
                            >
                                Setujui
                            </PrimaryButton>
                        </div>
                    ) : (
                        <PrimaryButton>{data_mahasiswa.status}</PrimaryButton>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default KrsVerifikasi;
