import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import TextInputContent from "../input/TextInputContent";
import SelectContent from "../input/SelectContent";
import DataTable from "react-data-table-component";
import PrimaryButton from "../PrimaryButton";
import DangerButton from "../DangerButton";

const MahasiswaForm = ({ data_fakultas, data_prodi }) => {
    const { data, setData, reset, processing, errors } = useForm({
        nama_mahasiswa: "",
        fakultas: "",
        prodi: "",
        angkatan: "",
        nim: "",
    });

    const [dataTemp, setDataTemp] = useState([]);

    const handleNIM = () => {
        const dataAngkatan = data.angkatan?.toString().slice(2, 4);
        const kodeProdi = data_prodi.find(
            (item) => item.id == data.prodi
        )?.kode_prodi;
        const kodeFakultas = data_fakultas.find(
            (item) => item.id == data.fakultas
        )?.kode_fakultas;
        if ((dataAngkatan, kodeProdi, kodeFakultas)) {
            setData("nim", `${dataAngkatan}${kodeFakultas}${kodeProdi}`);
        }
    };

    const payloadDataTemp = {
        ...data,
        fakultas: data_fakultas.find((item) => item.id == data.fakultas)
            ?.nama_fakultas,
        prodi: data_prodi.find((item) => item.id == data.prodi)?.nama_prodi,
    };

    const handleAddedTemp = (e) => {
        e.preventDefault();
        setDataTemp((prev) => [...prev, payloadDataTemp]);
        reset();
    };

    const handleRemoveTemp = (param) => {
        setDataTemp((prev) => prev.filter((_, index) => index != param));
    };

    useEffect(() => {
        handleNIM();
    }, [data.angkatan, data.fakultas, data.prodi]);

    const columns = [
        {
            name: "Nama Mahasiswa",
            selector: (row) => row.nama_mahasiswa,
        },
        {
            name: "NIM",
            selector: (row) => row.nim,
        },
        {
            name: "Fakultas",
            selector: (row) => row.fakultas,
        },
        {
            name: "Program Studi",
            selector: (row) => row.prodi,
        },
        {
            name: "Angkatan",
            selector: (row) => row.angkatan,
        },
        {
            name: "Action",
            selector: (row, index) => (
                <DangerButton onClick={() => handleRemoveTemp(index)}>
                    Delete
                </DangerButton>
            ),
        },
    ];

    return (
        <>
            <form className="flex flex-col gap-4" onSubmit={handleAddedTemp}>
                <TextInputContent
                    label={"Nama Mahasiswa"}
                    type={"text"}
                    name={"nama_mahasiswa"}
                    value={data.nama_mahasiswa}
                    onChange={(e) => setData("nama_mahasiswa", e.target.value)}
                    errors={errors.nama_mahasiswa}
                />
                <TextInputContent
                    label={"Angkatan"}
                    type={"number"}
                    name={"angkatan"}
                    value={data.angkatan}
                    onChange={(e) => setData("angkatan", e.target.value)}
                    errors={errors.angkatan}
                />
                <div className="grid grid-cols-2 gap-4">
                    <SelectContent
                        data={data_fakultas}
                        name={"fakultas"}
                        label={"Fakultas"}
                        valueField={"id"}
                        labelField={"nama_fakultas"}
                        handleChange={(e) =>
                            setData("fakultas", e.target.value)
                        }
                        value={data.fakultas}
                    />
                    <SelectContent
                        data={data_prodi}
                        name={"prodi"}
                        label={"Program Studi"}
                        valueField={"id"}
                        labelField={"nama_prodi"}
                        handleChange={(e) => setData("prodi", e.target.value)}
                        value={data.prodi}
                    />
                </div>
                <TextInputContent
                    label={"Nomor Induk Mahasiswa"}
                    type={"text"}
                    name={"nim"}
                    value={data.nim}
                    errors={errors.nim}
                    readOnly
                />
                <PrimaryButton className="w-32">TAMBAHKAN</PrimaryButton>
            </form>

            <div className="mt-4 flex flex-col gap-4">
                <h1>Daftar data yang akan disimpan</h1>
                <DataTable data={dataTemp} columns={columns} />
                {dataTemp?.length > 0 && (
                    <div className="flex gap-4 items-center">
                        <DangerButton onClick={() => setDataTemp([])}>
                            RESET
                        </DangerButton>
                        <PrimaryButton>SUBMIT</PrimaryButton>
                    </div>
                )}
            </div>
        </>
    );
};

export default MahasiswaForm;
