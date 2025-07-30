import MahasiswaForm from "@/Components/forms/MahasiswaForm";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

const CreateMahasiswa = ({ data_fakultas, data_prodi }) => {
    return (
        <AdminLayout title={["Mahasiswa", "Form"]}>
            <div className=" text-gray-900 mb-4">
                <p className="text-lg">Formulir Pembuatan Mahasiswa</p>
                <span className="text-sm font-bold">
                    Silahkan mengisi formulir dengan benar!
                </span>
            </div>
            <MahasiswaForm
                data_fakultas={data_fakultas}
                data_prodi={data_prodi}
            />
        </AdminLayout>
    );
};

export default CreateMahasiswa;
