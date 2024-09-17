import BoxCount from "@/Components/BoxCount";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

const DashboardDosen = ({ data_mata_kuliah, data_fakultas, data_prodi }) => {
    return (
        <AdminLayout title={"Dashboard"}>
            <div className="flex gap-2">
                <BoxCount title={" Mata Kuliah"} count={data_mata_kuliah} />
                <BoxCount title={" Fakultas"} count={data_fakultas} />
                <BoxCount title={" Program Studi"} count={data_prodi} />
            </div>
        </AdminLayout>
    );
};

export default DashboardDosen;
