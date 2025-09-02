import TextInputContent from "@/Components/input/TextInputContent";
import PrimaryButton from "@/Components/PrimaryButton";
import SubText from "@/Components/SubText";
import { useForm } from "@inertiajs/react";
import React from "react";

const CreateTahunAjaran = () => {
    const { data, setData, processing, reset, post } = useForm({
        semester_ajaran: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("tahun_ajaran.store"), {
            onSuccess: () => {
                reset();
            },
        });
    };
    return (
        <div className="p-4">
            <SubText text={"Formulir Tahun Ajaran Aktif"} />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <TextInputContent
                    label={"Semester Ajaran"}
                    placeholder={"2025/1"}
                    value={data.semester_ajaran}
                    onChange={(e) => setData("semester_ajaran", e.target.value)}
                />
                <PrimaryButton disabled={processing}>SIMPAN</PrimaryButton>
            </form>
        </div>
    );
};

export default CreateTahunAjaran;
