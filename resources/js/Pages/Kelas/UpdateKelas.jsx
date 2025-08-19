import KelasForm from "@/Components/forms/KelasForm";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import data_kelas from "@/static/DataKelas.json";
const UpdateKelas = ({
    data_kelas_detail,
    data_dosen,
    data_prodi,
    data_mahasiswa,
}) => {
    return (
        <AdminLayout title={["Kelas", "Form", "Edit"]}>
            {" "}
            <div className="bg-white rounded-md p-4">
                <KelasForm
                    data_mahasiswa={data_mahasiswa}
                    data_dosen={data_dosen}
                    data_prodi={data_prodi}
                    data_kelas={data_kelas}
                    data_kelas_detail={data_kelas_detail}
                />
            </div>
        </AdminLayout>
    );
};

export default UpdateKelas;
