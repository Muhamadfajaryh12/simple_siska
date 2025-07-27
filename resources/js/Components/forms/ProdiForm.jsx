import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import TextInputContent from "../input/TextInputContent";
import { useForm } from "@inertiajs/react";
import SelectContent from "../input/SelectContent";
import PrimaryButton from "../PrimaryButton";

const ProdiForm = ({ data_fakultas }) => {
    const { data, setData, processing, post, errors, reset } = useForm({
        nama_prodi: "",
        kode_prodi: "",
        id_fakultas: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("prodi.store"));
        reset();
    };

    return (
        <AdminLayout>
            <div className=" text-gray-900">
                <p className="text-lg">Formulir Pembuatan Program Studi</p>
                <span className="text-sm font-bold">
                    Silahkan mengisi formulir dengan benar!
                </span>
            </div>
            <form className="my-4" onSubmit={handleSubmit}>
                <TextInputContent
                    label={"Nama Program Studi"}
                    name={"nama_prodi"}
                    type={"text"}
                    errors={errors.nama_prodi}
                    value={data.nama_prodi}
                />
                <TextInputContent
                    label={"Kode Program Studi"}
                    name={"kode_prodi"}
                    type={"text"}
                    errors={errors.kode_prodi}
                    value={data.kode_prodi}
                />
                <SelectContent
                    data={data_fakultas || []}
                    label={"Fakultas"}
                    name={"id_fakultas"}
                    valueField={"id"}
                    labelField={"nama_fakultas"}
                    handleChange={setData("id_fakultas")}
                    errors={errors.id_fakultas}
                />
                <PrimaryButton disabled={processing}>Submit </PrimaryButton>
            </form>
        </AdminLayout>
    );
};

export default ProdiForm;
