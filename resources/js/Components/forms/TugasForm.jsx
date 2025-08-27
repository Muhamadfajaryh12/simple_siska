import React from "react";
import TextInputContent from "../input/TextInputContent";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "../PrimaryButton";
import { useModal } from "@/Context/ModalContext";
import SelectContent from "../input/SelectContent";

const tugasData = [
    {
        id: "tugas",
    },
    {
        id: "uts",
    },
    {
        id: "uas",
    },
];

const TugasForm = ({ id, data_tugas }) => {
    const { post, data, setData, processing, reset, put } = useForm({
        judul_tugas: data_tugas?.judul_tugas || "",
        deskripsi_tugas: data_tugas?.deskripsi_tugas || "",
        deadline: data_tugas?.deadline || "",
        pertemuan_id: data_tugas?.pertemuan_id || id,
        type: data_tugas?.type || "",
    });

    const { closeModal } = useModal();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (data_tugas) {
            put(route("tugas.edit", { id: data_tugas.id }));
        } else {
            post(route("tugas.store"), {
                onSuccess: () => {
                    reset();
                    closeModal();
                },
            });
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className=" font-bold">Tugas Pertemuan ke - </h1>
                <button onClick={closeModal}>X</button>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <TextInputContent
                    label={"Judul Tugas"}
                    name={"judul_tugas"}
                    value={data.judul_tugas}
                    type={"text"}
                    onChange={(e) => setData("judul_tugas", e.target.value)}
                />
                <TextInputContent
                    label={"Deskripsi Tugas"}
                    name={"deskripsi_tugas"}
                    value={data.deskripsi_tugas}
                    type={"text"}
                    onChange={(e) => setData("deskripsi_tugas", e.target.value)}
                />
                <TextInputContent
                    label={"Deadline"}
                    name={"deadline"}
                    value={data.deadline}
                    type={"date"}
                    onChange={(e) => setData("deadline", e.target.value)}
                />
                <SelectContent
                    data={tugasData}
                    label={"Tipe"}
                    name={"type"}
                    value={data.type}
                    valueField={"id"}
                    labelField={"id"}
                    handleChange={(e) => setData("type", e.target.value)}
                />
                <PrimaryButton disabled={processing}>Simpan</PrimaryButton>
            </form>
        </div>
    );
};

export default TugasForm;
