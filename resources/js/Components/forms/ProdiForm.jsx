import AdminLayout from "@/Layouts/AdminLayout";
import React, { useEffect } from "react";
import TextInputContent from "../input/TextInputContent";
import { useForm } from "@inertiajs/react";
import SelectContent from "../input/SelectContent";
import PrimaryButton from "../PrimaryButton";

const ProdiForm = ({ data_fakultas, data_prodi }) => {
    const { data, setData, processing, post, put, errors, reset } = useForm({
        nama_prodi: "",
        kode_prodi: "",
        fakultas_id: "",
    });

    useEffect(() => {
        if (data_prodi) {
            setData({
                nama_prodi: data_prodi.nama_prodi,
                kode_prodi: data_prodi.kode_prodi,
                fakultas_id: data_prodi.fakultas_id,
            });
        }
    }, [data_prodi]);

    const handleSubmit = (e) => {
        e.preventDefault();
        data_prodi
            ? put(route("prodi.edit", { id: data_prodi.id }))
            : post(route("prodi.store"), {
                  onSuccess: () => {
                      reset();
                  },
              });
    };

    return (
        <form className="my-4 flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextInputContent
                label={"Nama Program Studi"}
                name={"nama_prodi"}
                type={"text"}
                errors={errors.nama_prodi}
                value={data.nama_prodi}
                onChange={(e) => setData("nama_prodi", e.target.value)}
            />
            <TextInputContent
                label={"Kode Program Studi"}
                name={"kode_prodi"}
                type={"number"}
                errors={errors.kode_prodi}
                value={data.kode_prodi}
                onChange={(e) => setData("kode_prodi", e.target.value)}
            />
            <SelectContent
                data={data_fakultas}
                label={"Fakultas"}
                name={"fakultas_id"}
                valueField={"id"}
                labelField={"nama_fakultas"}
                handleChange={(e) => setData("fakultas_id", e.target.value)}
                errors={errors.fakultas_id}
                value={data.fakultas_id}
            />
            <PrimaryButton disabled={processing}>Submit </PrimaryButton>
        </form>
    );
};

export default ProdiForm;
