import MataKuliahForm from "@/Components/forms/MataKuliahForm";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import data_semester from "@/static/DataSemster.json";
const FormCreateMatakuliah = ({ data_prodi }) => {
    return (
        <AdminLayout title={["Mata Kuliah", "Form"]}>
            <div className="bg-white rounded-md p-4">
                <MataKuliahForm
                    data_prodi={data_prodi}
                    data_semester={data_semester}
                />
            </div>
        </AdminLayout>
    );
};

export default FormCreateMatakuliah;
