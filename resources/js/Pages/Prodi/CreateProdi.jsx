import ProdiForm from "@/Components/forms/ProdiForm";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

const CreateProdi = ({ fakultas }) => {
    return (
        <div>
            <AdminLayout title={["Program Studi", "Form"]}>
                <div className=" text-gray-900">
                    <p className="text-lg">Formulir Pembuatan Program Studi</p>
                    <span className="text-sm font-bold">
                        Silahkan mengisi formulir dengan benar!
                    </span>
                </div>
                <ProdiForm data_fakultas={fakultas} />
            </AdminLayout>
        </div>
    );
};

export default CreateProdi;
