import { useModal } from "@/Context/ModalContext";
import React from "react";
import PrimaryButton from "../PrimaryButton";
import DangerButton from "../DangerButton";

const DeleteModal = ({ handleDelete }) => {
    const { closeModal } = useModal();
    return (
        <div className="p-3">
            <h1 className="text-center text-md my-4">
                Apakah Anda yakin ingin menghapus data ini?
                <br></br>
                Tindakan ini tidak dapat dibatalkan.
            </h1>
            <div className="flex gap-2 justify-center">
                <PrimaryButton type="button" onClick={closeModal}>
                    Tutup
                </PrimaryButton>
                <DangerButton type="button" onClick={handleDelete}>
                    Konfirmasi
                </DangerButton>
            </div>
        </div>
    );
};

export default DeleteModal;
