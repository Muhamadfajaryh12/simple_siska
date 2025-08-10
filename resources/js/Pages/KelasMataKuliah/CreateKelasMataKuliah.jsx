import KelasMataKuliahForm from "@/Components/forms/KelasMataKuliahForm";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

const CreateKelasMataKuliah = ({ data_dosen, data_mata_kuliah }) => {
    return (
        <AdminLayout title={["Kelas Mata Kuliah", "Form"]}>
            <KelasMataKuliahForm
                data_dosen={data_dosen}
                data_mata_kuliah={data_mata_kuliah}
            />
        </AdminLayout>
    );
};

export default CreateKelasMataKuliah;
