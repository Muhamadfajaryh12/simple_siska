import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import TextInputContent from "../input/TextInputContent";
import SelectContent from "../input/SelectContent";
import DataTable from "react-data-table-component";
import PrimaryButton from "../PrimaryButton";
import DangerButton from "../DangerButton";

const MahasiswaForm = ({
    data_fakultas,
    data_prodi,
    data_mahasiswa,
    data_golongan_ukt,
}) => {
    const [filterUkt, setFilterUkt] = useState([]);
    const { data, setData, reset, processing, post, errors, put } = useForm({
        data_mahasiswa: [],
    });

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

    const payload = {
        ...data,
        fakultas: data_fakultas.find((item) => item.id == data.fakultas_id)
            ?.nama_fakultas,
        prodi: data_prodi.find((item) => item.id == data.prodi_id)?.nama_prodi,
        golongan_ukt: data_golongan_ukt.find(
            (item) => item.id == data.golongan_ukt_id
        )?.golongan,
    };

    const handleAddedTemp = (e) => {
        e.preventDefault();
        setData((prevData) => ({
            ...prevData,
            data_mahasiswa: [...prevData.data_mahasiswa, payload],
            nama_mahasiswa: "",
            angkatan: "",
            fakultas_id: "",
            prodi_id: "",
            nim: "",
        }));
    };

    const handleRemoveTemp = (param) => {
        const removeData = data.data_mahasiswa.filter(
            (_, index) => index != param
        );
        setData("data_mahasiswa", removeData);
    };

    useEffect(() => {
        handleNIM();
    }, [data.angkatan, data.fakultas_id, data.prodi_id]);

    useEffect(() => {
        if (data_mahasiswa) {
            filterGolonganUKT(data_mahasiswa.prodi_id);
            setData({
                nama_mahasiswa: data_mahasiswa.nama_mahasiswa,
                angkatan: data_mahasiswa.angkatan,
                fakultas_id: data_mahasiswa.fakultas_id,
                prodi_id: data_mahasiswa.prodi_id,
                nim: data_mahasiswa.nim,
                golongan_ukt_id: data_mahasiswa.golongan_ukt_id,
            });
        }
    }, [data_mahasiswa]);

    const handleSubmit = () => {
        post(
            route("mahasiswa.store", {
                onSuccess: () => {
                    reset();
                },
            })
        );
    };

    const handleUpdate = () => {
        put(route("mahasiswa.edit", { id: data_mahasiswa.id }));
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
            name: "Golongan UKT",
            selector: (row) => row.golongan_ukt,
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

    const handleProdiUKT = (value) => {
        setData("prodi_id", value);
        filterGolonganUKT(value);
    };

    const filterGolonganUKT = (id) => {
        const dataFilterUkt = data_golongan_ukt.filter(
            (item) => item.prodi_id == id
        );
        const formatDataFilterUkt = dataFilterUkt?.map((item) => ({
            id: item.id,
            label: `${item.golongan} - ${item.prodi.nama_prodi}`,
        }));
        setFilterUkt(formatDataFilterUkt);
    };
    return (
        <>
            <form
                className="flex flex-col gap-4"
                onSubmit={!data_mahasiswa ? handleAddedTemp : handleUpdate}
            >
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
                <div className="grid grid-cols-3 gap-4">
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
                        handleChange={(e) => handleProdiUKT(e.target.value)}
                        value={data.prodi_id}
                    />
                    <SelectContent
                        label={"Golongan UKT"}
                        name={"golongan_ukt_id"}
                        value={data.golongan_ukt_id}
                        handleChange={(e) =>
                            setData("golongan_ukt_id", e.target.value)
                        }
                        errors={errors.golongan_ukt_id}
                        data={filterUkt}
                        valueField={"id"}
                        labelField={"label"}
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
                <PrimaryButton className="text-center" disabled={processing}>
                    {!data_mahasiswa ? "TAMBAHKAN" : "SIMPAN"}
                </PrimaryButton>
            </form>
            {!data_mahasiswa && (
                <div className="mt-4 flex flex-col gap-4">
                    <h1>Daftar data yang akan disimpan</h1>
                    <DataTable data={data.data_mahasiswa} columns={columns} />
                    {data.data_mahasiswa?.length > 0 && (
                        <div className="flex gap-4 items-center">
                            <DangerButton
                                onClick={() => {}}
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
            )}
        </>
    );
};

export default MahasiswaForm;
