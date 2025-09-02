import DosenForm from "@/Components/forms/DosenForm";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
const CreateDosen = ({ data_fakultas, data_prodi }) => {
    return (
        <AdminLayout title={["Dosen", "Form"]}>
            <div className="bg-white rounded-md p-4">
                <DosenForm
                    data_fakultas={data_fakultas}
                    data_prodi={data_prodi}
                />
            </div>
        </AdminLayout>
    );
};

export default CreateDosen;
