import KelasForm from "@/Components/forms/KelasForm";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import data_kelas from "@/static/DataKelas.json";
const FormCreateKelas = ({ data_mahasiswa, data_prodi, data_dosen }) => {
    return (
        <AdminLayout title={["Kelas", "Form"]}>
            <KelasForm
                data_mahasiswa={data_mahasiswa}
                data_dosen={data_dosen}
                data_prodi={data_prodi}
                data_kelas={data_kelas}
            />
        </AdminLayout>
    );
};

export default FormCreateKelas;
