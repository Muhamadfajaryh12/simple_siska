import React, { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import Alert from "@/Components/Alert";

const FormUpdateFakultas = ({ fakultas }) => {
    const [alert, setAlert] = useState(null);
    const { data, setData, put, processing, errors } = useForm({
        nama_fakultas: "",
        kode_fakultas: "",
    });
    useEffect(() => {
        if (fakultas) {
            setData({
                nama_fakultas: fakultas.nama_fakultas,
                kode_fakultas: fakultas.kode_fakultas,
            });
        }
    }, [fakultas]);
    const submit = (e) => {
        e.preventDefault();

        put(route("fakultas.change", fakultas.id), {
            onSuccess: () => {
                setAlert({
                    type: "success",
                    message: "Updated Fakultas Successfully",
                });
            },
        });
    };
    return (
        <>
            <AdminLayout title="Update Fakultas">
                {alert && <Alert message={alert.message} />}
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

export default FormUpdateFakultas;
