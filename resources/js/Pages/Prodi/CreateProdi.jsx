import ProdiForm from "@/Components/forms/ProdiForm";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

const CreateProdi = ({ fakultas }) => {
    return (
        <div>
            <AdminLayout title={["Program Studi", "Form"]}>
                <div className="bg-white rounded-md p-4">
                    <ProdiForm data_fakultas={fakultas} />
                </div>
            </AdminLayout>
        </div>
    );
};

export default CreateProdi;
