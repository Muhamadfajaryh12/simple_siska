import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

const TugasKuliah = ({ data_tugas_kuliah }) => {
    console.log(data_tugas_kuliah);
    return (
        <AdminLayout title={["Tugas Kuliah"]}>
            <div className="flex flex-col gap-4">
                {data_tugas_kuliah.map((item) => (
                    <div className="bg-white rounded-md p-2 border">
                        <h1>{item.judul_tugas}</h1>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
};

export default TugasKuliah;
