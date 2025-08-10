import ContentVerify from "@/Components/ContentVerify";
import StatusButton from "@/Components/StatusButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import KRSLayout from "@/Layouts/KRSLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const KrsMahasiswaDetail = ({ auth, data_krs }) => {
    console.log(data_krs);
    let columns = [
        {
            name: "Mata Kuliah",
            selector: (row) => row.mata_kuliah.nama_mata_kuliah,
        },
        {
            name: "Kelas",
            selector: (row) => row.mata_kuliah.kelas,
        },
        // {
        //     name: "Dosen Pengampu",
        //     selector: (row) => row.mata_kuliah.dosen.nama,
        // },
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
            name: "SKS",
            selector: (row) => row.mata_kuliah.sks,
        },
        {
            name: "Nilai",
            selector: (row) => row.nilai_huruf || 0,
        },
        {
            name: "Status",
            selector: (row) => <StatusButton>{row.krs.status}</StatusButton>,
        },
    ];

    const totalSks = data_krs.reduce((total, item) => {
        return total + (item.krs?.total_sks || 0);
    }, 0);

    return (
        <KRSLayout auth={auth}>
            <div className="p-4">
                <DataTable fixedHeader columns={columns} data={data_krs} />
                <h6 className="text-sm font-bold mt-2 mx-4">
                    Total SKS : {totalSks}{" "}
                </h6>
            </div>
        </KRSLayout>
    );
};

export default KrsMahasiswaDetail;
