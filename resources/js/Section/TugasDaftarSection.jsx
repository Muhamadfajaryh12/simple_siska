import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import React from "react";
import DataTable from "react-data-table-component";
import { FaEye } from "react-icons/fa6";

const TugasDaftarSection = ({ data_tugas }) => {
    console.log(data_tugas);
    return (
        <div>
            <DataTable
                data={data_tugas}
                columns={[
                    {
                        name: "NIM",
                        selector: (row) => row.mahasiswa.nim,
                    },
                    {
                        name: "Mahasiswa",
                        selector: (row) => row.mahasiswa.nama_mahasiswa,
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
                        selector: (row) => <TextInput />,
                    },
                ]}
            />
        </div>
    );
};

export default TugasDaftarSection;
