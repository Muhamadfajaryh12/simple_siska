import PrimaryButton from "@/Components/PrimaryButton";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import React from "react";
import DataTable from "react-data-table-component";

const NilaiDosen = ({ data_krs }) => {
    const { data, setData, post, processing } = useForm();

    const handleChange = (id, field, value) => {
        setData((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                krs_detail_id: id,
                [field]: value,
            },
        }));
    };

    const handleSave = (row) => {
        const nilaiRow = data[row.id] || {};

        post(route("nilai.store"), { [row.id]: nilaiRow });
        console.log(data);
    };

    const columns = [
        {
            name: "NIM",
            selector: (row) => row.krs.mahasiswa.nim,
        },
        {
            name: "Mahasiswa",
            selector: (row) => row.krs.mahasiswa.nama_mahasiswa,
        },
        {
            name: "Mata Kuliah",
            selector: (row) => row.mata_kuliah.nama_mata_kuliah,
        },
        {
            name: "Nilai Angka",
            selector: (row) => (
                <input
                    type="number"
                    maxLength={2}
                    className="w-20 border rounded"
                    value={data[row.id]?.nilai_angka || ""}
                    onChange={(e) =>
                        handleChange(row.id, "nilai_angka", e.target.value)
                    }
                ></input>
            ),
        },
        {
            name: "Nilai Huruf",
            selector: (row) => (
                <input
                    type="text"
                    maxLength={2}
                    className="w-20 border rounded"
                    value={data[row.id]?.nilai_huruf || ""}
                    onChange={(e) =>
                        handleChange(row.id, "nilai_huruf", e.target.value)
                    }
                ></input>
            ),
        },
        {
            name: "Action",
            selector: (row) => (
                <PrimaryButton
                    disabled={processing}
                    onClick={() => handleSave(row)}
                >
                    Simpan Nilai
                </PrimaryButton>
            ),
        },
    ];

    return (
        <AdminLayout title={["Nilai"]}>
            <DataTable columns={columns} data={data_krs} />
        </AdminLayout>
    );
};

export default NilaiDosen;
