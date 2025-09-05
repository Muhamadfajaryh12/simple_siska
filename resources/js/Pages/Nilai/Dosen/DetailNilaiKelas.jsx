import NilaiKelasForm from "@/Components/forms/NilaiKelasForm";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

const DetailNilaiKelas = ({ data_detail_krs }) => {
    return (
        <AdminLayout title={["Kelas", "Nilai"]}>
            <NilaiKelasForm data_detail_krs={data_detail_krs} />
        </AdminLayout>
    );
};

export default DetailNilaiKelas;
