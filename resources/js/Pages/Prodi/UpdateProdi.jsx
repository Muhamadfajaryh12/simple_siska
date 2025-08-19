import ProdiForm from "@/Components/forms/ProdiForm";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

const UpdateProdi = ({ data_fakultas, data_prodi }) => {
    return (
        <AdminLayout
            title={[
                "Program Studi",
                "Form",
                "Edit",
                `${data_prodi.nama_prodi}`,
            ]}
        >
            {" "}
            <div className="bg-white rounded-md p-4">
                <div className=" text-gray-900">
                    <p className="text-lg">Formulir Mengedit Program Studi</p>
                    <span className="text-sm font-bold">
                        Silahkan mengisi formulir dengan benar!
                    </span>
                </div>
                <ProdiForm
                    data_fakultas={data_fakultas}
                    data_prodi={data_prodi}
                />
            </div>
        </AdminLayout>
    );
};

export default UpdateProdi;
