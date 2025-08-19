import DosenForm from "@/Components/forms/DosenForm";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

const UpdateDosen = ({ data_fakultas, data_prodi, data_dosen }) => {
    return (
        <AdminLayout
            title={["Dosen", "Form", "Edit", `${data_dosen.nama_dosen}`]}
        >
            <div className="bg-white rounded-md p-4">
                <DosenForm
                    data_fakultas={data_fakultas}
                    data_prodi={data_prodi}
                    data_dosen={data_dosen}
                />
            </div>
        </AdminLayout>
    );
};

export default UpdateDosen;
