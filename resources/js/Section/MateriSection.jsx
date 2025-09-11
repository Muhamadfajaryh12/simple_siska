import DangerButton from "@/Components/DangerButton";
import CreateTugasForm from "@/Components/forms/CreateTugasForm";
import TextInputContent from "@/Components/input/TextInputContent";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import SubText from "@/Components/SubText";
import { useModal } from "@/Context/ModalContext";
import { Link } from "@inertiajs/react";
import React from "react";
import { FaEye, FaFilePdf, FaPencil, FaTrash } from "react-icons/fa6";

const MateriSection = ({ data_pertemuan }) => {
    const { showModal } = useModal();
    const handleOpenModal = () => {
        showModal(<CreateTugasForm data_pertemuan={data_pertemuan} />);
    };

    return (
        <div className="bg-white rounded-md p-4 my-4">
            <SubText text={"Materi Pertemuan"} />
            {data_pertemuan.materi ? (
                <div className="flex flex-col gap-4">
                    <TextInputContent
                        label={"Materi"}
                        type={"text"}
                        name={"materi"}
                        value={data_pertemuan.materi}
                    />

                    <div className="">
                        <InputLabel value={"File Materi"} />
                        <Link href="" className="mt-4">
                            <DangerButton>
                                <p className="mr-2 text-xs">LIHAT FILE</p>
                                <FaEye />
                            </DangerButton>
                        </Link>
                    </div>
                    <div className="flex justify-end gap-2 ">
                        <SecondaryButton onClick={handleOpenModal}>
                            <FaPencil />
                        </SecondaryButton>
                        <DangerButton>
                            <FaTrash />
                        </DangerButton>
                    </div>
                </div>
            ) : (
                <div>
                    <h1 className="text-center my-2">
                        Pertemuan ini belum memiliki materi
                    </h1>
                    <div className="flex justify-center">
                        <SecondaryButton onClick={handleOpenModal}>
                            MEMBUAT Materi
                        </SecondaryButton>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MateriSection;
