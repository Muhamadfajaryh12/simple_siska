import MahasiswaForm from "@/Components/forms/MahasiswaForm";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

const CreateMahasiswa = ({ data_fakultas, data_prodi, data_golongan_ukt }) => {
    return (
        <AdminLayout title={["Mahasiswa", "Formulir"]}>
            <div className="bg-white p-4">
                <MahasiswaForm
                    data_fakultas={data_fakultas}
                    data_prodi={data_prodi}
                    data_golongan_ukt={data_golongan_ukt}
                />
            </div>
        </AdminLayout>
    );
};

export default CreateMahasiswa;
