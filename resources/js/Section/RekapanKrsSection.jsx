import StatusButton from "@/Components/StatusButton";
import SubText from "@/Components/SubText";
import React from "react";
import DataTable from "react-data-table-component";

const RekapanKrsSection = ({ data_krs_mahasiswa, data_total_sks }) => {
    const columns = [
        {
            name: "Mata Kuliah",
            selector: (row) => row.nama_mata_kuliah,
        },
        {
            name: "SKS",
            selector: (row) => row.sks,
        },
        {
            name: "Status",
            selector: (row) => <StatusButton>{row.status}</StatusButton>,
        },
        {
            name: "Nilai Angka",
            selector: (row) => row.nilai_total,
        },
        {
            name: "Nilai Huruf",
            selector: (row) => row.nilai_huruf,
        },
    ];
    return (
        <div>
            <div className="grid grid-cols-3 gap-4 my-4">
                <div className="bg-white p-4 text-lg rounded-md  ">
                    <SubText text="Total SKS Ditempuh" />
                    <span className="font-extrabold text-2xl text-blue-900">
                        {data_total_sks.total_sks_ditempuh}
                    </span>
                </div>
                <div className="bg-white p-4 text-lg rounded-md  ">
                    <SubText text="SKS Wajib" />
                    <span className="font-extrabold text-2xl text-blue-900">
                        144
                    </span>
                </div>
                <div className="bg-white p-4 text-lg rounded-md  ">
                    <SubText text="Indeks Prestasi Kumulatif" />
                    <span className="font-extrabold text-2xl text-blue-900">
                        {data_total_sks.ipk}
                    </span>
                </div>
            </div>
            {Object.keys(data_krs_mahasiswa).map((item) => (
                <div className="rounded-md my-4 bg-white p-4">
                    <SubText
                        text={`Semester ${data_krs_mahasiswa[item].semester}`}
                    />
                    <DataTable
                        data={data_krs_mahasiswa[item].daftar_mata_kuliah}
                        columns={columns}
                    />
                    <h1 className="text-sm font-bold my-2">
                        Index Prestasi Semester : {data_krs_mahasiswa[item].ips}
                    </h1>
                </div>
            ))}
        </div>
    );
};

export default RekapanKrsSection;
