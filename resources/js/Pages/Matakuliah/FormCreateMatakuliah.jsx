import MataKuliahForm from "@/Components/forms/MataKuliahForm";
import AdminLayout from "@/Layouts/AdminLayout";
import React, { useEffect, useState } from "react";
import data_jadwal from "@/static/DataJadwal.json";
import data_semester from "@/static/DataSemster.json";
const FormCreateMatakuliah = ({
    data_fakultas,
    data_prodi,
    data_dosen,
    data_kelas,
}) => {
    return (
        <AdminLayout title={["Mata Kuliah", "Form"]}>
            <div className=" text-gray-900">
                <p className="text-lg">Formulir Pembuatan Mata Kuliah</p>
                <span className="text-sm font-bold">
                    Silahkan mengisi formulir dengan benar!
                </span>
            </div>
            <MataKuliahForm
                data_fakultas={data_fakultas}
                data_prodi={data_prodi}
                data_dosen={data_dosen}
                data_kelas={data_kelas}
                data_jadwal={data_jadwal}
                data_semester={data_semester}
            />
        </AdminLayout>
    );
};

export default FormCreateMatakuliah;
