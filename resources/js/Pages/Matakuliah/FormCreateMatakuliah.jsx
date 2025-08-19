import MataKuliahForm from "@/Components/forms/MataKuliahForm";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import data_semester from "@/static/DataSemster.json";
const FormCreateMatakuliah = ({ data_prodi }) => {
    return (
        <AdminLayout title={["Mata Kuliah", "Form"]}>
            <div className="bg-white rounded-md p-4">
                <div className=" text-gray-900 mb-2">
                    <p className="text-lg">Formulir Pembuatan Mata Kuliah</p>
                    <span className="text-sm font-bold">
                        Silahkan mengisi formulir dengan benar!
                    </span>
                </div>
                <MataKuliahForm
                    data_prodi={data_prodi}
                    data_semester={data_semester}
                />
            </div>
        </AdminLayout>
    );
};

export default FormCreateMatakuliah;
