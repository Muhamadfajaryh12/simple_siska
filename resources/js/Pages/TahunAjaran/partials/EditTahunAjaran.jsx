import SelectContent from "@/Components/input/SelectContent";
import PrimaryButton from "@/Components/PrimaryButton";
import SubText from "@/Components/SubText";
import { useForm } from "@inertiajs/react";
import React from "react";

const EditTahunAjaran = ({ data_semester_ajaran }) => {
    const { setData, data, processing, put } = useForm({
        id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("tahun_ajaran.edit", { id: data.id }));
    };

    return (
        <div className="p-4">
            <SubText text={"Formulir Edit Tahun Ajaran Aktif"} />
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <SelectContent
                    data={data_semester_ajaran}
                    valueField={"id"}
                    labelField={"semester_ajaran"}
                    value={data.id}
                    handleChange={(e) => setData("id", e.target.value)}
                    label={"Tahun Ajaran Aktif"}
                />

                <PrimaryButton disabled={processing}>SIMPAN</PrimaryButton>
            </form>
        </div>
    );
};

export default EditTahunAjaran;
