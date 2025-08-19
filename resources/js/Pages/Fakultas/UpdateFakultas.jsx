import React from "react";
import FakultasForm from "@/Components/forms/FakultasForm";
import AdminLayout from "@/Layouts/AdminLayout";

const UpdateFakultas = ({ fakultas }) => {
    return (
        <AdminLayout title={["Fakultas", "Form", `${fakultas.nama_fakultas}`]}>
            <div className="bg-white rounded-md p-4">
                <div className=" text-gray-900">
                    <p className="text-lg">Formulir Pembuatan Fakultas</p>
                    <span className="text-sm font-bold">
                        Silahkan mengisi formulir dengan benar!
                    </span>
                </div>
                <FakultasForm fakultas={fakultas} />
            </div>
        </AdminLayout>
    );
};

export default UpdateFakultas;
