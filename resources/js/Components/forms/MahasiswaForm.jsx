import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

const MahasiswaForm = () => {
    return (
        <AdminLayout title={"Form"}>
            <div className=" text-gray-900">
                <p className="text-lg">Formulir Pembuatan Mahasiswa</p>
                <span className="text-sm font-bold">
                    Silahkan mengisi formulir dengan benar!
                </span>
                <form></form>
            </div>
        </AdminLayout>
    );
};

export default MahasiswaForm;
