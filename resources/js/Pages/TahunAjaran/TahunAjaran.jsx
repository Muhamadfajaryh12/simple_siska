import PrimaryButton from "@/Components/PrimaryButton";
import { useModal } from "@/Context/ModalContext";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import CreateTahunAjaran from "./partials/CreateTahunAjaran";
import DataTable from "react-data-table-component";
import StatusButton from "@/Components/StatusButton";
import SecondaryButton from "@/Components/SecondaryButton";
import EditTahunAjaran from "./partials/EditTahunAjaran";

const TahunAjaran = ({ data_semester_ajaran }) => {
    const { showModal } = useModal();

    const handleCreateModal = () => {
        showModal(<CreateTahunAjaran />);
    };

    const handleEditModal = () => {
        showModal(
            <EditTahunAjaran data_semester_ajaran={data_semester_ajaran} />
        );
    };
    return (
        <AdminLayout title={["Tahun Ajaran", "Daftar"]}>
            <div className="flex justify-between mb-4">
                <SecondaryButton onClick={() => handleEditModal()}>
                    MENGUBAH TAHUN AJARAN AKTIF
                </SecondaryButton>
                <PrimaryButton onClick={() => handleCreateModal()}>
                    Membuat Semester Ajaran
                </PrimaryButton>
            </div>
            <DataTable
                data={data_semester_ajaran}
                columns={[
                    {
                        name: "Tahun Ajaran",
                        selector: (row) => row.semester_ajaran,
                    },
                    {
                        name: "Status",
                        selector: (row) => (
                            <StatusButton>{row.status}</StatusButton>
                        ),
                    },
                ]}
            />
        </AdminLayout>
    );
};

export default TahunAjaran;
