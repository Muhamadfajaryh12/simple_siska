import React from "react";
import data_jadwal from "@/static/DataJadwal.json";
import data_semester from "@/static/DataSemster.json";
import AdminLayout from "@/Layouts/AdminLayout";
import MataKuliahForm from "@/Components/forms/MataKuliahForm";
const UpdateMatakuliah = ({
    data_dosen,
    data_prodi,
    data_kelas,
    data_mata_kuliah,
}) => {
    return (
        <AdminLayout title={["Mata Kuliah", "Form", "Edit"]}>
            <div className="bg-white rounded-md p-4">
                <div className=" text-gray-900 mb-2">
                    <p className="text-lg">Formulir Pembuatan Mata Kuliah</p>
                    <span className="text-sm font-bold">
                        Silahkan mengisi formulir dengan benar!
                    </span>
                </div>
                <MataKuliahForm
                    data_prodi={data_prodi}
                    data_dosen={data_dosen}
                    data_kelas={data_kelas}
                    data_jadwal={data_jadwal}
                    data_semester={data_semester}
                    data_mata_kuliah={data_mata_kuliah}
                />
            </div>
        </AdminLayout>
    );
};

export default UpdateMatakuliah;
