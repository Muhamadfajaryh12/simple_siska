import KelasMataKuliahForm from "@/Components/forms/KelasMataKuliahForm";
import AdminLayout from "@/Layouts/AdminLayout";
import react from "react";

const UpdateKelasMataKuliah = ({
    data_dosen,
    data_mata_kuliah,
    data_kelas_mata_kuliah,
}) => {
    return (
        <AdminLayout title={["Kelas Mata Kuliah", "Form", "Edit"]}>
            <KelasMataKuliahForm
                data_dosen={data_dosen}
                data_mata_kuliah={data_mata_kuliah}
                detail_kelas_mata_kuliah={data_kelas_mata_kuliah}
            />
        </AdminLayout>
    );
};

export default UpdateKelasMataKuliah;
