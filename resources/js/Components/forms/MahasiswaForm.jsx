import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import TextInputContent from "../input/TextInputContent";
import SelectContent from "../input/SelectContent";
import DataTable from "react-data-table-component";
import PrimaryButton from "../PrimaryButton";
import DangerButton from "../DangerButton";

const MahasiswaForm = ({ data_fakultas, data_prodi }) => {
    const { data, setData, reset, processing, post, errors } = useForm({
        nama_mahasiswa: "",
        fakultas_id: "",
        prodi_id: "",
        angkatan: "",
        nim: "",
    });

    const [dataTemp, setDataTemp] = useState([]);
    const [dataMahasiswaTemp, setDataMahasiswaTemp] = useState([]);

    const handleNIM = () => {
        const dataAngkatan = data.angkatan?.toString().slice(2, 4);
        const kodeProdi = data_prodi.find(
            (item) => item.id == data.prodi_id
        )?.kode_prodi;
        const kodeFakultas = data_fakultas.find(
            (item) => item.id == data.fakultas_id
        )?.kode_fakultas;
        if ((dataAngkatan, kodeProdi, kodeFakultas)) {
            setData("nim", `${dataAngkatan}${kodeFakultas}${kodeProdi}`);
        }
    };

    const payloadDataTemp = {
        ...data,
        fakultas: data_fakultas.find((item) => item.id == data.fakultas_id)
            ?.nama_fakultas,
        prodi: data_prodi.find((item) => item.id == data.prodi_id)?.nama_prodi,
    };

    const handleAddedTemp = (e) => {
        e.preventDefault();
        setDataTemp((prev) => [...prev, payloadDataTemp]);
        setDataMahasiswaTemp((prev) => [...prev, data]);
        reset();
    };

    const handleRemoveTemp = (param) => {
        setDataTemp((prev) => prev.filter((_, index) => index != param));
        setDataMahasiswaTemp((prev) =>
            prev.filter((_, index) => index != param)
        );
    };

    useEffect(() => {
        handleNIM();
    }, [data.angkatan, data.fakultas_id, data.prodi_id]);

    const handleSubmit = () => {
        post(
            route("mahasiswa.store", {
                data: dataMahasiswaTemp,
                onSuccess: () => {
                    setDataTemp();
                    setDataMahasiswaTemp();
                },
            })
        );
    };
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
                <DangerButton
                    disabled={processing}
                    onClick={() => handleRemoveTemp(index)}
                >
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
                        name={"fakultas_id"}
                        label={"Fakultas"}
                        valueField={"id"}
                        labelField={"nama_fakultas"}
                        handleChange={(e) =>
                            setData("fakultas_id", e.target.value)
                        }
                        value={data.fakultas_id}
                    />
                    <SelectContent
                        data={data_prodi}
                        name={"prodi_id"}
                        label={"Program Studi"}
                        valueField={"id"}
                        labelField={"nama_prodi"}
                        handleChange={(e) =>
                            setData("prodi_id", e.target.value)
                        }
                        value={data.prodi_id}
                    />
                </div>
                <TextInputContent
                    label={"Nomor Induk Mahasiswa"}
                    type={"text"}
                    name={"nim"}
                    value={data.nim}
                    errors={errors.nim}
                    onChange={(e) => setData("nim", e.target.value)}
                />
                <PrimaryButton className="w-32" disabled={processing}>
                    TAMBAHKAN
                </PrimaryButton>
            </form>

            <div className="mt-4 flex flex-col gap-4">
                <h1>Daftar data yang akan disimpan</h1>
                <DataTable data={dataTemp} columns={columns} />
                {dataTemp?.length > 0 && (
                    <div className="flex gap-4 items-center">
                        <DangerButton
                            onClick={() => {
                                setDataMahasiswaTemp([]);
                                setDataTemp([]);
                            }}
                            disabled={processing}
                        >
                            RESET
                        </DangerButton>
                        <PrimaryButton
                            onClick={() => handleSubmit()}
                            disabled={processing}
                        >
                            SUBMIT
                        </PrimaryButton>
                    </div>
                )}
            </div>
        </>
    );
};

export default MahasiswaForm;
