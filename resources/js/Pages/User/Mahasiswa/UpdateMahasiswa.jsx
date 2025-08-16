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
            <div className=" text-gray-900 mb-4">
                <p className="text-lg">Formulir Pembuatan Mahasiswa</p>
                <span className="text-sm font-bold">
                    Silahkan mengisi formulir dengan benar!
                </span>
            </div>
            <MahasiswaForm
                data_fakultas={data_fakultas}
                data_prodi={data_prodi}
                data_mahasiswa={data_mahasiswa}
                data_golongan_ukt={data_golongan_ukt}
            />
        </AdminLayout>
    );
};

export default UpdateMahasiswa;
