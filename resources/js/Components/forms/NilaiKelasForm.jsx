import React from "react";
import DataTable from "react-data-table-component";
import PrimaryButton from "../PrimaryButton";
import { useForm } from "@inertiajs/react";

const NilaiKelasForm = ({ data_detail_krs }) => {
    const { data, setData, put, processing } = useForm({
        nilai: data_detail_krs.map((item) => ({
            mahasiswa: item.krs.mahasiswa.nama_mahasiswa,
            nim: item.krs.mahasiswa.nim,
            krs_detail_id: item.id,
            absen: item.absen || 0,
            tugas: item.tugas || 0,
            uts: item.uts || 0,
            uas: item.uas,
            nilai_total: item.nilai_total || 0,
        })),
    });

    const handleChange = (index, field, value) => {
        const updatedNilai = [...data.nilai];
        updatedNilai[index][field] = value;
        setData("nilai", updatedNilai);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("nilai.edit"));
    };

    const colums = [
        {
            name: "NIM",
            selector: (row) => row.nim,
        },
        {
            name: "Mahasiswa",
            selector: (row) => row.mahasiswa,
        },
        {
            name: "Nilai Absen",
            selector: (row, index) => (
                <input
                    type="text"
                    className="w-14"
                    value={row.absen}
                    onChange={(e) =>
                        handleChange(index, "absen", e.target.value)
                    }
                />
            ),
        },
        {
            name: "Nilai Tugas",
            selector: (row, index) => (
                <input
                    type="text"
                    className="w-14"
                    value={row.tugas}
                    onChange={(e) =>
                        handleChange(index, "tugas", e.target.value)
                    }
                />
            ),
        },
        {
            name: "Nilai UTS",
            selector: (row, index) => (
                <input
                    type="text"
                    className="w-14"
                    value={row.uts}
                    onChange={(e) => handleChange(index, "uts", e.target.value)}
                />
            ),
        },
        {
            name: "Nilai UAS",
            selector: (row, index) => (
                <input
                    type="text"
                    className="w-14"
                    value={row.uas}
                    onChange={(e) => handleChange(index, "uas", e.target.value)}
                />
            ),
        },
        {
            name: "Total Nilai",
            selector: (row) => row.nilai_total,
        },
    ];
    return (
        <div>
            <DataTable data={data.nilai} columns={colums} />
            <PrimaryButton
                className="my-4"
                type="submit"
                onClick={handleSubmit}
            >
                Simpan
            </PrimaryButton>
        </div>
    );
};

export default NilaiKelasForm;
