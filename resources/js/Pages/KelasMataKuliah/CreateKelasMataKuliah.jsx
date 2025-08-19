import KelasMataKuliahForm from "@/Components/forms/KelasMataKuliahForm";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

const CreateKelasMataKuliah = ({ data_dosen, data_mata_kuliah }) => {
    return (
        <AdminLayout title={["Kelas Mata Kuliah", "Form"]}>
            <div className="bg-white rounded-md p-4">
                <KelasMataKuliahForm
                    data_dosen={data_dosen}
                    data_mata_kuliah={data_mata_kuliah}
                />
            </div>
        </AdminLayout>
    );
};

export default CreateKelasMataKuliah;
