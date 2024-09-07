import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import React from "react";

const FormCreateUser = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        nomor_induk: "",
        email: "",
        status: "",
        jenis_kelamin: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post();
    };

    const emailUser = (value) => {
        setData({
            ...data,
            nomor_induk: value,
            email: value + "@gmail.com",
            password: value,
        });
    };
    return (
        <AdminLayout title={"Create User"}>
            <div className="">
                <form onSubmit={submit}>
                    <div className="my-2">
                        <InputLabel
                            htmlFor="Nama Lengkap"
                            value="Nama Lengkap"
                        />
                        <TextInput
                            id="nama"
                            type="text"
                            name="nama"
                            placeholder="Nama Lengkap"
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData("nama", e.target.value)}
                            value={data.nama}
                        />{" "}
                        <InputError message={errors.nama} className="mt-2" />
                    </div>
                    <div className="my-2">
                        <InputLabel htmlFor="Nomor Induk" value="Nomor Induk" />
                        <TextInput
                            id="nomor_induk"
                            type="number"
                            name="nomor_induk"
                            placeholder="Nomor Induk (Dengan Angka 16 Digit)"
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => emailUser(e.target.value)}
                            value={data.nomor_induk}
                        />{" "}
                        <InputError
                            message={errors.nomor_induk}
                            className="mt-2"
                        />
                    </div>
                    <div className="my-2">
                        <InputLabel htmlFor="Email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="mt-1 block w-full"
                            isFocused={true}
                            value={data.email}
                            readOnly
                        />{" "}
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="my-2 grid grid-cols-2 gap-2">
                        <div className="">
                            <InputLabel htmlFor="Level" value="Level" />
                            <Select
                                id="status"
                                name="status"
                                className="mt-1 block w-full"
                                data={[
                                    {
                                        id: "Mahasiswa",
                                    },
                                    {
                                        id: "Dosen",
                                    },
                                ]}
                                valueField="id"
                                labelField="id"
                            />{" "}
                            <InputError
                                message={errors.status}
                                className="mt-2"
                            />
                        </div>
                        <div className="">
                            <InputLabel
                                htmlFor="Jenis Kelamin"
                                value="Jenis Kelamin"
                            />
                            <Select
                                id="jenis_kelamin"
                                name="jenis_kelamin"
                                className="mt-1 block w-full"
                                data={[
                                    {
                                        id: "Laki-Laki",
                                    },
                                    {
                                        id: "Perempuan",
                                    },
                                ]}
                                valueField="id"
                                labelField="id"
                            />
                            <InputError
                                message={errors.jenis_kelamin}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <PrimaryButton className="mt-4" disabled={processing}>
                        Submit
                    </PrimaryButton>
                </form>
            </div>
        </AdminLayout>
    );
};

export default FormCreateUser;
