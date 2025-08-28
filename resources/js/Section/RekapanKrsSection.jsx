import StatusButton from "@/Components/StatusButton";
import React from "react";
import DataTable from "react-data-table-component";

const RekapanKrsSection = ({ data_krs_mahasiswa, data_total_sks }) => {
    console.log(data_total_sks);
    console.log(data_krs_mahasiswa);
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
                <div className="bg-white p-6 text-lg rounded-md flex justify-between items-center ">
                    <span>Total SKS Ditempuh</span>{" "}
                    <span>{data_total_sks.total_sks_ditempuh}</span>
                </div>{" "}
                <div className="bg-white p-6 text-lg rounded-md flex justify-between items-center ">
                    <span>SKS Wajib</span> <span>144</span>
                </div>
                <div className="bg-white p-6 text-lg rounded-md flex justify-between items-center ">
                    <span>Indeks Prestasi Kumulatif</span>{" "}
                    <span>{data_total_sks.ipk}</span>
                </div>
            </div>
            {Object.keys(data_krs_mahasiswa).map((item) => (
                <div className="rounded-md my-4 bg-white p-4">
                    <h1 className="font-bold">
                        Semester {data_krs_mahasiswa[item].semester}
                    </h1>
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
