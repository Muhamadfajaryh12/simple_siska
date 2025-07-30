import DosenForm from "@/Components/forms/DosenForm";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import data_gender from "@/static/DataGender.json";
const CreateDosen = ({ data_fakultas, data_prodi }) => {
    return (
        <AdminLayout title={["Dosen", "Form"]}>
            <div className=" text-gray-900 mb-4">
                <p className="text-lg">Formulir Pembuatan Dosen</p>
                <span className="text-sm font-bold">
                    Silahkan mengisi formulir dengan benar!
                </span>
            </div>
            <DosenForm
                data_fakultas={data_fakultas}
                data_prodi={data_prodi}
                data_gender={data_gender}
            />
        </AdminLayout>
    );
};

export default CreateDosen;
