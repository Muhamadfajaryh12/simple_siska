import Alert from "@/Components/Alert";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import React from "react";

const FormCreateProdi = ({ fakultas }) => {
    const { data, setData, processing, post, errors, reset } = useForm({
        nama_prodi: "",
        kode_prodi: "",
        id_fakultas: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("prodi.store"));
        reset();
    };

    const updateKodeProdi = (value) => {
        setData({
            ...data,
            kode_prodi: value.toUpperCase().slice(0, 3),
            nama_prodi: value.toUpperCase(),
        });
    };
    return (
        <div>
            <AdminLayout title="Master Program Studi">
                <div className=" text-gray-900">
                    <p className="text-lg">Formulir Pembuatan Program Studi</p>
                    <span className="text-sm font-bold">
                        Silahkan mengisi formulir dengan benar!
                    </span>
                </div>
                <div className="mt-2">
                    <form onSubmit={submit}>
                        <div className="w-96">
                            <InputLabel
                                htmlFor="nama_prodi"
                                value="Nama Prodi"
                            />
                            <TextInput
                                id="nama_prodi"
                                type="text"
                                name="nama_prodi"
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    updateKodeProdi(e.target.value)
                                }
                                value={data.nama_prodi}
                            />
                            <InputError
                                message={errors.nama_prodi}
                                className="mt-2"
                            />
                        </div>

                        <div className="w-96 mt-2">
                            <InputLabel
                                htmlFor="id_fakultas"
                                value="Nama Fakultas"
                            />
                            <Select
                                id="id_fakultas"
                                name="id_fakultas"
                                className="mt-1 block w-full"
                                data={fakultas}
                                valueField="id"
                                labelField="nama_fakultas"
                                onChange={(e) =>
                                    setData("id_fakultas", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.id_fakultas}
                                className="mt-2"
                            />
                        </div>
                        <div className="w-96 mt-2">
                            <InputLabel
                                htmlFor="kode_prodi"
                                value="Kode Prodi"
                            />
                            <TextInput
                                id="kode_prodi"
                                type="text"
                                name="kode_prodi"
                                className="mt-1 block w-full"
                                isFocused={true}
                                readOnly
                                value={data.kode_prodi}
                            />
                            <InputError
                                message={errors.kode_prodi}
                                className="mt-2"
                            />
                        </div>
                        <PrimaryButton className="mt-4" disabled={processing}>
                            Submit
                        </PrimaryButton>
                    </form>
                </div>
            </AdminLayout>
        </div>
    );
};

export default FormCreateProdi;
