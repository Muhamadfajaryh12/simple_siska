import { useModal } from "@/Context/ModalContext";
import { useForm } from "@inertiajs/react";
import React from "react";
import DangerButton from "../DangerButton";
import SecondaryButton from "../SecondaryButton";

const TandaTugasForm = ({ id }) => {
    const { post, data, setData } = useForm({
        status: "",
    });

    const { closeModal } = useModal();
    const handleSubmit = () => {
        setData("status", "selesai");

        post(route("tugas_mahasiswa.edit", id), {
            onSuccess: () => {
                closeModal();
            },
        });
    };
    return (
        <div className="p-4 text-center">
            <h1>Anda yakin akan menandai tugas ini sudah selesai ?</h1>
            <p>
                Tugas yang sudah dikirim{" "}
                <span className="text-red-500">
                    tidak dapat diubah kembali.
                </span>
            </p>
            <div className="flex justify-center gap-2 my-4">
                <DangerButton onClick={closeModal}>Tutup</DangerButton>{" "}
                <SecondaryButton onClick={handleSubmit}>
                    Tandai Selesai
                </SecondaryButton>
            </div>
        </div>
    );
};

export default TandaTugasForm;
