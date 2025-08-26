import { useModal } from "@/Context/ModalContext";
import React, { useRef, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import DangerButton from "../DangerButton";
import Webcam from "react-webcam";
import SecondaryButton from "../SecondaryButton";
import { router, useForm } from "@inertiajs/react";

const AbsenModal = ({ id }) => {
    const { closeModal } = useModal();
    const webRef = useRef();
    const [image, setImage] = useState(null);
    const { post, data, setData, processing } = useForm({
        file_foto: "",
    });

    const Base64toFile = async (base64, filename) => {
        const res = await fetch(base64);
        const blob = await res.blob();
        return new File([blob], filename, { type: blob.type });
    };
    const capturePhoto = async () => {
        const imgSrc = webRef.current.getScreenshot();
        let path = await Base64toFile(imgSrc, "absen.jpg");
        setData("file_foto", path);
        setImage(imgSrc);
    };

    const removePhoto = () => {
        setImage(null);
        setData("file_foto", "");
    };

    const handleAbsen = (e) => {
        e.preventDefault();
        post(
            route("absen.store", {
                pertemuan_id: id,
            }),
            {
                forceFormData: true,
                onSuccess: () => {
                    closeModal();
                },
            }
        );
    };

    return (
        <div className="p-4">
            {!image ? (
                <>
                    <Webcam
                        ref={webRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                    />
                    <SecondaryButton
                        onClick={capturePhoto}
                        className="w-full my-4"
                    >
                        Ambil Foto
                    </SecondaryButton>
                </>
            ) : (
                <>
                    <img src={image} />{" "}
                    <SecondaryButton
                        onClick={removePhoto}
                        className="w-full my-4"
                    >
                        Hapus Foto
                    </SecondaryButton>
                </>
            )}
            <div className="flex flex-col gap-4">
                <PrimaryButton onClick={handleAbsen}>ABSEN</PrimaryButton>
                <DangerButton onClick={closeModal}>Tutup</DangerButton>
            </div>
        </div>
    );
};

export default AbsenModal;
