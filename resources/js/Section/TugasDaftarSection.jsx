import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

import React from "react";
import DataTable from "react-data-table-component";
import { FaEye } from "react-icons/fa6";

const TugasDaftarSection = ({ data_tugas }) => {
    const { data, setData, put, processing } = useForm({
        data_nilai_tugas_mahasiswa: data_tugas.map((item) => ({
            id: item.id,
            nim: item.mahasiswa.nim,
            nama_mahasiswa: item.mahasiswa.nama_mahasiswa,
            submit_date: item.submit_date,
            nilai: item.nilai || 0,
        })),
    });

    const handleChangeNilai = (index, field, value) => {
        const updateNilai = [...data.data_nilai_tugas_mahasiswa];
        updateNilai[index][field] = value;
        setData("data_nilai_tugas_mahasiswa", updateNilai);
    };

    const handleSubmitNilai = () => {
        put(route("tugas_mahasiswa_nilai.edit"));
    };

    return (
        <div className="bg-white my-4 ">
            <DataTable
                data={data.data_nilai_tugas_mahasiswa}
                columns={[
                    {
                        name: "NIM",
                        selector: (row) => row.nim,
                    },
                    {
                        name: "Mahasiswa",
                        selector: (row) => row.nama_mahasiswa,
                    },
                    {
                        name: "Tanggal Submit",
                        selector: (row) => row.submit_date,
                    },
                    {
                        name: "Tugas",
                        selector: (row) => (
                            <SecondaryButton>
                                <FaEye />
                            </SecondaryButton>
                        ),
                    },
                    {
                        name: "Nilai",
                        selector: (row, index) => (
                            <TextInput
                                value={row.nilai}
                                onChange={(e) =>
                                    handleChangeNilai(
                                        index,
                                        "nilai",
                                        e.target.value
                                    )
                                }
                            />
                        ),
                    },
                ]}
            />
            <PrimaryButton
                className="m-4"
                onClick={handleSubmitNilai}
                disabled={processing}
            >
                Simpan
            </PrimaryButton>
        </div>
    );
};

export default TugasDaftarSection;
