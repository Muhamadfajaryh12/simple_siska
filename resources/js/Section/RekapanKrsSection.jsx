import StatusButton from "@/Components/StatusButton";
import React from "react";
import DataTable from "react-data-table-component";

const RekapanKrsSection = ({ data_krs_mahasiswa }) => {
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
            name: "SKS",
            selector: (row) => row.kelas_mata_kuliah.mata_kuliah.sks,
        },
        {
            name: "Status",
            selector: (row) => <StatusButton>{row.krs.status}</StatusButton>,
        },
        {
            name: "Nilai",
            selector: (row) => row.nilai_total,
        },
    ];
    return (
        <div>
            <div className="grid grid-cols-3 gap-4 my-4">
                <div className="bg-white p-6 text-lg rounded-md flex justify-between items-center ">
                    <span>Total SKS Ditempuh</span> <span>144</span>
                </div>{" "}
                <div className="bg-white p-6 text-lg rounded-md flex justify-between items-center ">
                    <span>SKS Wajib</span> <span>144</span>
                </div>
                <div className="bg-white p-6 text-lg rounded-md flex justify-between items-center ">
                    <span>Indeks Prestasi Kumulatif</span> <span>3.9</span>
                </div>
            </div>
            {Object.keys(data_krs_mahasiswa).map((item) => (
                <div className="rounded-md my-4 bg-white p-4">
                    <h1 className="font-bold">Semester {item}</h1>
                    <DataTable
                        data={data_krs_mahasiswa[item]}
                        columns={columns}
                    />
                </div>
            ))}
        </div>
    );
};

export default RekapanKrsSection;
