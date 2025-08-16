import GolonganUktForm from "@/Components/forms/GolonganUktForm";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

const CreateGolonganUkt = ({ data_prodi }) => {
    return (
        <AdminLayout title={["Golongan UKT", "Form"]}>
            <GolonganUktForm data_prodi={data_prodi} />
        </AdminLayout>
    );
};

export default CreateGolonganUkt;
