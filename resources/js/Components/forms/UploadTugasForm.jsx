import React, { useState } from "react";
import TextInputContent from "../input/TextInputContent";
import { useForm } from "@inertiajs/react";
import { useModal } from "@/Context/ModalContext";
import PrimaryButton from "../PrimaryButton";

const UploadTugasForm = ({ id }) => {
    const { closeModal } = useModal();
    const { post, data, setData, processing } = useForm({
        file_pengumpulan: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("tugas_mahasiswa.edit", id), {
            forceFormData: true,
            onSuccess: () => {
                closeModal();
            },
        });
    };

    return (
        <div className="p-4">
            <h1 className="mb-4">Mengirim tugas</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
                encType="multipart/form-data"
            >
                <TextInputContent
                    type={"file"}
                    label={"Upload Tugas"}
                    name={"file_pengumpulan"}
                    onChange={(e) => {
                        setData("file_pengumpulan", e.target.files[0]);
                    }}
                />
                <PrimaryButton disabled={processing}>KIRIM</PrimaryButton>
            </form>
        </div>
    );
};

export default UploadTugasForm;
