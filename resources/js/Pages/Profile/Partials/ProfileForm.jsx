import SelectContent from "@/Components/input/SelectContent";
import TextInputContent from "@/Components/input/TextInputContent";
import PrimaryButton from "@/Components/PrimaryButton";
import SubText from "@/Components/SubText";
import { useForm } from "@inertiajs/react";
import React from "react";

const dataKelamin = [
    {
        id: "Laki-Laki",
    },
    {
        id: "Perempuan",
    },
];
const ProfileForm = ({ data_mahasiswa }) => {
    const { data, setData, put, processing, errors } = useForm({
        tempat_lahir: data_mahasiswa.tempat_lahir || "",
        tanggal_lahir: data_mahasiswa.tanggal_lahir || "",
        alamat: data_mahasiswa.alamat || "",
        contact: data_mahasiswa.contact || "",
        jenis_kelamin: data_mahasiswa.jenis_kelamin || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("profile.edit", { id: data_mahasiswa.id }));
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <SubText text={"Informasi Diri"} />
            <TextInputContent
                type={"text"}
                label={"Nama Lengkap"}
                value={data_mahasiswa.nama_mahasiswa}
                disabled
            />
            <TextInputContent
                type={"text"}
                label={"Nomor Induk Mahasiswa"}
                value={data_mahasiswa.nim}
                disabled
            />
            <TextInputContent
                type={"text"}
                label={"Tempat Lahir (Opsional)"}
                name={"tempat_lahir"}
                value={data.tempat_lahir}
                onChange={(e) => setData("tempat_lahir", e.target.value)}
            />
            <TextInputContent
                type={"date"}
                label={"Tanggal Lahir (Opsional)"}
                name={"tanggal_lahir"}
                value={data.tanggal_lahir}
                onChange={(e) => setData("tanggal_lahir", e.target.value)}
            />
            <SelectContent
                label={"Jenis Kelamin (Opsional)"}
                data={dataKelamin}
                valueField={"id"}
                labelField={"id"}
                name={"jenis_kelamin"}
                value={data.jenis_kelamin}
                handleChange={(e) => setData("jenis_kelamin", e.target.value)}
            />
            <TextInputContent
                type={"text"}
                label={"Alamat (Opsional)"}
                name={"alamat"}
                value={data.alamat}
                onChange={(e) => setData("alamat", e.target.value)}
            />
            <TextInputContent
                type={"text"}
                label={"Kontak (Opsional)"}
                name={"contact"}
                value={data.contact}
                onChange={(e) => setData("contact", e.target.value)}
            />
            <PrimaryButton disabled={processing}>Simpan</PrimaryButton>
        </form>
    );
};

export default ProfileForm;
