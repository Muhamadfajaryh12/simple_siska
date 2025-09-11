import React from "react";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInputContent from "@/Components/input/TextInputContent";

const CreateTugasForm = ({ data_pertemuan }) => {
    const { data, setData, processing, post } = useForm({
        materi: data_pertemuan?.materi || "",
        file_materi: "",
    });
    const handleEdit = (e) => {
        e.preventDefault();
        post(route("pertemuan.edit", { id: data_pertemuan.id }), {
            forceFormData: true,
        });
    };
    return (
        <div className="p-4">
            <form
                onSubmit={handleEdit}
                encType="multipart/form-data"
                className="flex flex-col gap-4"
            >
                <TextInputContent
                    label={"Materi"}
                    type={"text"}
                    name={"materi"}
                    value={data.materi}
                    onChange={(e) => setData("materi", e.target.value)}
                />
                <TextInputContent
                    label="File Materi"
                    type="file"
                    name="file_materi"
                    onChange={(e) => setData("file_materi", e.target.files[0])}
                />
                <PrimaryButton disabled={processing}>SIMPAN</PrimaryButton>
            </form>
        </div>
    );
};

export default CreateTugasForm;
