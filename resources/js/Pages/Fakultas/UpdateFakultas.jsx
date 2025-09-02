import React from "react";
import FakultasForm from "@/Components/forms/FakultasForm";
import AdminLayout from "@/Layouts/AdminLayout";

const UpdateFakultas = ({ fakultas }) => {
    return (
        <AdminLayout title={["Fakultas", "Form", `${fakultas.nama_fakultas}`]}>
            <div className="bg-white rounded-md p-4">
                <FakultasForm fakultas={fakultas} />
            </div>
        </AdminLayout>
    );
};

export default UpdateFakultas;
