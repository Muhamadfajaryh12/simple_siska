import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import TextInputContent from "../input/TextInputContent";
import SelectContent from "../input/SelectContent";
import PrimaryButton from "../PrimaryButton";
import DataTable from "react-data-table-component";
import DangerButton from "../DangerButton";
import { FaTrash } from "react-icons/fa6";

const DosenForm = ({ data_fakultas, data_prodi, data_dosen }) => {
    const { data, setData, errors, post, put, reset, processing } = useForm({
        nama_dosen: "",
        nip: "",
        fakultas_id: "",
        prodi_id: "",
    });

    const [dataTemp, setDataTemp] = useState([]);
    const [dataDosenTemp, setDataDosenTemp] = useState([]);

    const payload = {
        ...data,
        fakultas: data_fakultas.find((item) => item.id == data.fakultas_id)
            ?.nama_fakultas,
        prodi: data_prodi.find((item) => item.id == data.prodi_id)?.nama_prodi,
    };

    useEffect(() => {
        if (data_dosen) {
            setData({
                nama_dosen: data_dosen.nama_dosen,
                nip: data_dosen.nip,
                fakultas_id: data_dosen.fakultas_id,
                prodi_id: data_dosen.prodi_id,
            });
        }
    }, [data_dosen]);

    const handleAddedTemp = (e) => {
        e.preventDefault();
        setDataTemp((prev) => [...prev, payload]);
        setDataDosenTemp((prev) => [...prev, data]);
        reset();
    };

    const handleDeleteTemp = (param) => {
        setDataTemp((prev) => prev.filter((_, index) => index != param));
        setDataDosenTemp((prev) => prev.filter((_, index) => index != param));
    };

    const columns = [
        {
            name: "Nama Dosen",
            selector: (row) => row.nama_dosen,
        },
        {
            name: "NIP",
            selector: (row) => row.nip,
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
            name: "Action",
            selector: (row, index) => (
                <DangerButton
                    type="button"
                    onClick={() => handleDeleteTemp(index)}
                >
                    <FaTrash />
                </DangerButton>
            ),
        },
    ];

    const handlePost = () => {
        post(route("dosen.store", { data: dataDosenTemp }), {
            onSuccess: () => {
                setDataTemp([]);
                setDataDosenTemp([]);
            },
        });
    };

    const handleUpdate = () => {
        put(route("dosen.edit", { id: data_dosen.id }));
    };
    return (
        <>
            <form
                className="flex flex-col gap-4"
                onSubmit={!data_dosen ? handleAddedTemp : handleUpdate}
            >
                <TextInputContent
                    label={"Nama Dosen"}
                    type={"text"}
                    errors={errors.nama_dosen}
                    name={"nama_dosen"}
                    value={data.nama_dosen}
                    onChange={(e) => setData("nama_dosen", e.target.value)}
                />
                <TextInputContent
                    label={"Nomer Induk Pengajar"}
                    type={"text"}
                    errors={errors.nip}
                    name={"nip"}
                    value={data.nip}
                    onChange={(e) => setData("nip", e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                    <SelectContent
                        data={data_fakultas}
                        name={"fakultas_id"}
                        label={"Fakultas"}
                        valueField={"id"}
                        labelField={"nama_fakultas"}
                        value={data.fakultas_id}
                        handleChange={(e) =>
                            setData("fakultas_id", e.target.value)
                        }
                        errors={errors.fakultas_id}
                    />
                    <SelectContent
                        data={data_prodi}
                        name={"prodi_id"}
                        label={"Program Studi"}
                        valueField={"id"}
                        labelField={"nama_prodi"}
                        value={data.prodi_id}
                        handleChange={(e) =>
                            setData("prodi_id", e.target.value)
                        }
                        errors={errors.prodi_id}
                    />
                </div>
                <PrimaryButton disabled={processing}>
                    {!data_dosen ? "Tambahkan" : "Simpan"}
                </PrimaryButton>
            </form>
            {!data_dosen && (
                <div className="mt-4 flex flex-col gap-4">
                    <h1>Daftar data yang akan dibuat</h1>
                    <DataTable columns={columns} data={dataTemp} />
                    {dataTemp?.length > 0 && (
                        <div className="flex gap-2">
                            <DangerButton
                                className="w-24"
                                onClick={() => {
                                    setDataTemp([]);
                                    setDataDosenTemp([]);
                                }}
                                disabled={processing}
                            >
                                RESET
                            </DangerButton>
                            <PrimaryButton
                                className="w-24"
                                disabled={processing}
                                onClick={() => handlePost()}
                            >
                                SIMPAN
                            </PrimaryButton>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default DosenForm;
