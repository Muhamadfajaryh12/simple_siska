import DosenForm from "@/Components/forms/DosenForm";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
const CreateDosen = ({ data_fakultas, data_prodi }) => {
    return (
        <AdminLayout title={["Dosen", "Form"]}>
            <div className="bg-white rounded-md p-4">
                <div className=" text-gray-900 mb-4">
                    <p className="text-lg">Formulir Pembuatan Dosen</p>
                    <span className="text-sm font-bold">
                        Silahkan mengisi formulir dengan benar!
                    </span>
                </div>
                <DosenForm
                    data_fakultas={data_fakultas}
                    data_prodi={data_prodi}
                />
            </div>
        </AdminLayout>
    );
};

export default CreateDosen;
