import DangerButton from "@/Components/DangerButton";
import TugasForm from "@/Components/forms/TugasForm";
import TextInputContent from "@/Components/input/TextInputContent";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useModal } from "@/Context/ModalContext";
import { router, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import AbsenDaftarMahasiswaSection from "./AbsenDaftarMahasiswaSection";
import TugasDaftarSection from "./TugasDaftarSection";
import DeleteModal from "@/Components/modal/DeleteModal";

const PertemuanDosenSection = ({ data_pertemuan, total_mahasiswa }) => {
    const { data, setData, put, processing } = useForm({
        materi: "",
    });
    const [active, setActive] = useState("absen");

    const { showModal, closeModal } = useModal();
    useEffect(() => {
        setData("materi", data_pertemuan?.materi || "");
    }, [data_pertemuan.id]);

    const handleEdit = (e) => {
        e.preventDefault();
        put(route("pertemuan.edit", { id: data_pertemuan.id }));
    };

    const handleModalTugas = () => {
        showModal(<TugasForm id={data_pertemuan.id} />);
    };

    const handleEditModalTugas = () => {
        showModal(
            <TugasForm id={data_pertemuan} data_tugas={data_pertemuan.tugas} />
        );
    };

    const handleDelete = () => {
        router.delete(route("tugas.destroy", { id: data_pertemuan.tugas.id }), {
            onSuccess: () => {
                closeModal();
            },
        });
    };
    const handleDeleteModalTugas = () => {
        showModal(<DeleteModal handleDelete={handleDelete} />);
    };
    const tabButtonClass = (activeTab) => {
        return `w-full p-2 rounded-md ${
            active == activeTab
                ? "bg-violet-500 text-white"
                : "bg-white shadow-sm"
        }`;
    };

    return (
        <div className="my-4 ">
            <form
                className="flex flex-col gap-4 border rounded-md p-4 bg-white"
                onSubmit={handleEdit}
            >
                <h1 className="block font-medium text-sm text-gray-700">
                    Tanggal Perkeluliahan : {data_pertemuan.tanggal}
                </h1>
                <TextInputContent
                    label={"Materi"}
                    type={"text"}
                    name={"materi"}
                    value={data.materi}
                    onChange={(e) => setData("materi", e.target.value)}
                />
                <PrimaryButton disabled={processing}>SIMPAN</PrimaryButton>
            </form>

            <div className="border rounded-md p-4 my-4 bg-white">
                {data_pertemuan.tugas ? (
                    <>
                        <h1>
                            Judul Tugas : {data_pertemuan.tugas.judul_tugas}
                        </h1>
                        <h1>
                            Desksripsi : {data_pertemuan.tugas.deskripsi_tugas}
                        </h1>
                        <h1>Deadline : {data_pertemuan.tugas.deadline}</h1>
                        <h1>Tipe : {data_pertemuan.tugas.type}</h1>
                        <div className="flex justify-end gap-2">
                            <SecondaryButton onClick={handleEditModalTugas}>
                                <FaPencil />
                            </SecondaryButton>
                            <DangerButton onClick={handleDeleteModalTugas}>
                                <FaTrash />
                            </DangerButton>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-center">
                            Pertemuan ini belum memiliki tugas
                        </h1>
                        <div className="flex justify-center my-2">
                            <SecondaryButton onClick={handleModalTugas}>
                                Membuat Tugas
                            </SecondaryButton>
                        </div>
                    </>
                )}
            </div>
            <div className="flex gap-2 my-4">
                <button
                    className={tabButtonClass("absen")}
                    onClick={() => setActive("absen")}
                >
                    Rekap Absen
                </button>
                <button
                    className={tabButtonClass("tugas")}
                    onClick={() => setActive("tugas")}
                >
                    Rekap Tugas
                </button>
            </div>
            {active == "absen" ? (
                <AbsenDaftarMahasiswaSection
                    data_pertemuan={data_pertemuan}
                    total_mahasiswa={total_mahasiswa}
                />
            ) : (
                <TugasDaftarSection
                    data_tugas={data_pertemuan?.tugas?.tugas_mahasiswa || []}
                />
            )}
        </div>
    );
};

export default PertemuanDosenSection;
