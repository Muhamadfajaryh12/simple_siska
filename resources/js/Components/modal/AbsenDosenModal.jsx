import { useModal } from "@/Context/ModalContext";
import { useForm } from "@inertiajs/react";
import React from "react";
import TextInputContent from "../input/TextInputContent";
import PrimaryButton from "../PrimaryButton";
import SelectContent from "../input/SelectContent";

const statusAbsenData = [
    {
        id: "hadir",
    },
    {
        id: "izin",
    },
];
const AbsenDosenModal = ({ pertemuan_id }) => {
    const { data, setData, processing, post, reset } = useForm({
        pertemuan_id: pertemuan_id,
        status: "",
    });

    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("absen_dosen.store"), {
            onSuccess: () => {
                closeModal();
                reset();
            },
        });
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <SelectContent
                    data={statusAbsenData}
                    value={data.status}
                    valueField={"id"}
                    labelField={"id"}
                    label={"Status kehadiran"}
                    handleChange={(e) => setData("status", e.target.value)}
                />
                <PrimaryButton disabled={processing}>Submit</PrimaryButton>
            </form>
        </div>
    );
};

export default AbsenDosenModal;
