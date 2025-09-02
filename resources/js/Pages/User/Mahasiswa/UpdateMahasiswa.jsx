import MahasiswaForm from "@/Components/forms/MahasiswaForm";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

const UpdateMahasiswa = ({
    data_fakultas,
    data_prodi,
    data_mahasiswa,
    data_golongan_ukt,
}) => {
    return (
        <AdminLayout
            title={[
                "Mahasiswa",
                "Formulir",
                "Edit",
                `${data_mahasiswa.nama_mahasiswa}`,
            ]}
        >
            <div className="bg-white rounded p-4">
                <MahasiswaForm
                    data_fakultas={data_fakultas}
                    data_prodi={data_prodi}
                    data_mahasiswa={data_mahasiswa}
                    data_golongan_ukt={data_golongan_ukt}
                />{" "}
            </div>
        </AdminLayout>
    );
};

export default UpdateMahasiswa;
