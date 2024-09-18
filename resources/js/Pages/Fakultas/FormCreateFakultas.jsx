import React, { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import Alert from "@/Components/Alert";

const FormCreateFakultas = ({ flash }) => {
    const [alert, setAlert] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_fakultas: "",
        kode_fakultas: "",
    });
    const submit = (e) => {
        e.preventDefault();

        post(route("fakultas.store"), {
            onSuccess: () => {
                setAlert({
                    type: "success",
                    message: "Created Fakultas Successfully",
                });
                reset();
            },
        });
    };
    return (
        <>
            <AdminLayout title="Create Fakultas">
                <div className=" text-gray-900">
                    <p className="text-lg">Formulir Pembuatan Fakultas</p>
                    <span className="text-sm font-bold">
                        Silahkan mengisi formulir dengan benar!
                    </span>
                </div>
                {flash.message && (
                    <Alert message={flash.message} status={flash.status} />
                )}
                <div className="mt-2">
                    <form onSubmit={submit}>
                        <div className="w-96">
                            <InputLabel
                                htmlFor="nama_fakultas"
                                value="Nama Fakultas"
                            />
                            <TextInput
                                id="nama_fakultas"
                                type="text"
                                name="nama_fakultas"
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData(
                                        "nama_fakultas",
                                        e.target.value.toUpperCase()
                                    )
                                }
                                value={data.nama_fakultas}
                            />
                            <InputError
                                message={errors.nama_fakultas}
                                className="mt-2"
                            />
                        </div>
                        <div className="w-96 mt-2">
                            <InputLabel
                                htmlFor="kode_fakultas"
                                value="Kode Fakultas"
                            />
                            <TextInput
                                id="kode_fakultas"
                                type="text"
                                name="kode_fakultas"
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData(
                                        "kode_fakultas",
                                        e.target.value.toUpperCase()
                                    )
                                }
                                value={data.kode_fakultas}
                            />
                            <InputError
                                message={errors.kode_fakultas}
                                className="mt-2"
                            />
                        </div>
                        <PrimaryButton className="mt-4" disabled={processing}>
                            Submit
                        </PrimaryButton>
                    </form>
                </div>
            </AdminLayout>
            ;
        </>
    );
};

export default FormCreateFakultas;
