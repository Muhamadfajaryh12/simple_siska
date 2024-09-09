import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import React from "react";

const FormCreateKelas = () => {
    const { data, setData, post, processing, errors } = useForm({
        nama_kelas: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("kelas.store"));
    };
    return (
        <AdminLayout title="Create Kelas">
            <form onSubmit={submit}>
                <div className="mt-2">
                    <InputLabel htmlFor="Nama Kelas" value={"Nama Kelas"} />
                    <TextInput
                        id="nama_kelas"
                        type="text"
                        name="nama_kelas"
                        className="w-full block mt-1"
                        placeholder="Nama Kelas"
                        isFocused={true}
                        onChange={(e) => setData("nama_kelas", e.target.value)}
                        value={data.nama_kelas}
                    />
                    <InputError message={errors.nama_kelas} className="mt-2" />
                </div>

                <PrimaryButton className="mt-2" disabled={processing}>
                    Submit
                </PrimaryButton>
            </form>
        </AdminLayout>
    );
};

export default FormCreateKelas;
