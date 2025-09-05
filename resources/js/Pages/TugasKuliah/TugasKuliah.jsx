import DangerButton from "@/Components/DangerButton";
import TandaTugasForm from "@/Components/forms/TandaTugasForm";
import UploadTugasForm from "@/Components/forms/UploadTugasForm";
import PreviewTugasModal from "@/Components/modal/PreviewTugasModal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import StatusButton from "@/Components/StatusButton";
import SubText from "@/Components/SubText";
import { useModal } from "@/Context/ModalContext";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import { FaPencil } from "react-icons/fa6";

const TugasKuliah = ({ data_tugas_kuliah }) => {
    const { showModal } = useModal();

    const handleUploadTugasModal = (id) => {
        showModal(<UploadTugasForm id={id} />);
    };

    const handleTandaTugasModal = (id) => {
        showModal(<TandaTugasForm id={id} />);
    };

    const handlePreviewTugasModal = (preview) => {
        showModal(<PreviewTugasModal preview={preview} />);
    };
    return (
        <AdminLayout title={["Tugas Kuliah"]}>
            <div className="flex flex-col gap-4">
                {data_tugas_kuliah.map((item) => (
                    <div className="bg-white rounded-md py-4 border shadow-sm  px-6">
                        <SubText text={item.tugas.type.toUpperCase()} />
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-1 ">
                                <h1 className="font-semibold">
                                    {
                                        item.tugas.pertemuan.kelas_mata_kuliah
                                            .mata_kuliah.nama_mata_kuliah
                                    }
                                </h1>
                                <h1>{item.tugas.judul_tugas}</h1>
                                <p className="text-sm">
                                    Tenggat waktu : {item.tugas.deadline}
                                </p>
                            </div>
                            <div className="flex gap-2 items-center ">
                                {item.status == "selesai" ? (
                                    <SecondaryButton
                                        onClick={() =>
                                            handlePreviewTugasModal(
                                                item.file_pengumpulan
                                            )
                                        }
                                    >
                                        Lihat
                                    </SecondaryButton>
                                ) : item.file_pengumpulan ? (
                                    <>
                                        <SecondaryButton>
                                            <FaPencil size={16} />
                                        </SecondaryButton>
                                        <PrimaryButton
                                            className="text-xs"
                                            onClick={() =>
                                                handleTandaTugasModal(item.id)
                                            }
                                        >
                                            Tandai Selesai
                                        </PrimaryButton>
                                    </>
                                ) : (
                                    <SecondaryButton
                                        onClick={() =>
                                            handleUploadTugasModal(item.id)
                                        }
                                    >
                                        Upload tugas
                                    </SecondaryButton>
                                )}

                                <StatusButton>{item.status}</StatusButton>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
};

export default TugasKuliah;
