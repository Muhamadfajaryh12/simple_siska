import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import DataTable from "react-data-table-component";
const KrsSection = ({ data_mata_kuliah }) => {
    const { data, setData, post, processing } = useForm({
        total_sks: "",
        semester: "",
        mata_kuliah: [],
    });

    const handleSelect = (state) => {
        const payload = state.selectedRows.map((item) => ({
            kelas_mata_kuliah_id: item.id,
        }));

        const countTotalSks = state.selectedRows.reduce(
            (sum, item) => sum + item.mata_kuliah.sks,
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
        post(route("krs_mahasiswa.store"));
    };

    const colums = [
        {
            name: "Mata Kuliah",
            selector: (row) => row.mata_kuliah.nama_mata_kuliah,
        },
        {
            name: "Kode Mata Kuliah",
            selector: (row) => row.mata_kuliah.kode_mata_kuliah,
        },
        {
            name: "SKS",
            selector: (row) => row.mata_kuliah.sks,
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
            selector: (row) => row.nama_kelas,
        },
        {
            name: "Semester",
            selector: (row) => row.mata_kuliah.semester,
        },
        {
            name: "Program Studi",
            selector: (row) => row.mata_kuliah.prodi.nama_prodi,
        },
        {
            name: "Dosen Pengampu",
            selector: (row) => row.dosen.nama_dosen,
        },
    ];
    return (
        <div className="bg-white rounded-md">
            <div className="p-6 text-gray-900">
                <p className="text-lg">Susunan Mata Kuliah</p>
                <span className="text-sm font-bold">
                    Silahkan pilih Mata Kuliah yang akan diambil!
                </span>
            </div>
            {Object.keys(data_mata_kuliah).map((semesterKey) => (
                <div key={semesterKey} className="my-2 p-4">
                    <h2 className="text-lg font-bold mb-2">
                        Semester {semesterKey}
                    </h2>
                    <DataTable
                        fixedHeader
                        columns={colums}
                        data={data_mata_kuliah[semesterKey]}
                        selectableRows
                        onSelectedRowsChange={handleSelect}
                    />
                </div>
            ))}
            <PrimaryButton
                className="m-2"
                onClick={submit}
                disabled={processing}
            >
                DIAMBIL ({data.mata_kuliah.length})
            </PrimaryButton>
        </div>
    );
};

export default KrsSection;
