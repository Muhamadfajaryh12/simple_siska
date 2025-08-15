import { useModal } from "@/Context/ModalContext";
import React, { useRef, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import DangerButton from "../DangerButton";
import Webcam from "react-webcam";
import SecondaryButton from "../SecondaryButton";

const AbsenModal = ({ handleAbsen }) => {
    const { closeModal } = useModal();
    const webRef = useRef();
    const [image, setImage] = useState(null);

    const capturePhoto = () => {
        const imgSrc = webRef.current.getScreenshot();
        setImage(imgSrc);
    };

    const removePhoto = () => {
        setImage(null);
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
