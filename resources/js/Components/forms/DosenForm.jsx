import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import TextInputContent from "../input/TextInputContent";
import SelectContent from "../input/SelectContent";
import PrimaryButton from "../PrimaryButton";
import DataTable from "react-data-table-component";
import DangerButton from "../DangerButton";

const DosenForm = ({ data_fakultas, data_prodi, data_gender }) => {
    const { data, setData, errors, post, reset, processing } = useForm({
        nama_dosen: "",
        nip: "",
        fakultas: "",
        prodi: "",
        gender: "",
    });

    const [dataTemp, setDataTemp] = useState([]);

    const handleAddedTemp = (e) => {
        e.preventDefault();
        setDataTemp((prev) => [...prev, data]);
        reset();
    };

    const handleDeleteTemp = (param) => {
        setDataTemp((prev) => prev.filter((_, index) => index != param));
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
            name: "Jenis Kelamin",
            selector: (row) => row.gender,
        },
        {
            name: "Action",
            selector: (row, index) => (
                <DangerButton
                    type="button"
                    onClick={() => handleDeleteTemp(index)}
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
                    label={"Nama Dosen"}
                    type={"text"}
                    errors={errors.nama_dosen}
                    name={"nama_dosen"}
                    value={data.nama_dosen}
                    onChange={(e) => setData("nama_dosen", e.target.value)}
                />
                <TextInputContent
                    label={"Nomer Induk Pengajar"}
                    type={"number"}
                    errors={errors.nip}
                    name={"nip"}
                    value={data.nip}
                    onChange={(e) => setData("nip", e.target.value)}
                />
                <div className="grid grid-cols-3 gap-4">
                    <SelectContent
                        data={data_fakultas}
                        name={"fakultas"}
                        label={"Fakultas"}
                        valueField={"id"}
                        labelField={"nama_fakultas"}
                        value={data.fakultas}
                        handleChange={(e) =>
                            setData("fakultas", e.target.value)
                        }
                        errors={errors.fakultas}
                    />
                    <SelectContent
                        data={data_prodi}
                        name={"prodi"}
                        label={"Program Studi"}
                        valueField={"id"}
                        labelField={"nama_prodi"}
                        value={data.prodi}
                        handleChange={(e) => setData("prodi", e.target.value)}
                        errors={errors.prodi}
                    />

                    <SelectContent
                        data={data_gender}
                        name={"gender"}
                        label={"Jenis Kelamin"}
                        valueField={"id"}
                        labelField={"id"}
                        value={data.gender}
                        handleChange={(e) => setData("gender", e.target.value)}
                        errors={errors.gender}
                    />
                </div>
                <PrimaryButton className="w-32">Tambahkan</PrimaryButton>
            </form>
            <div className="mt-4 flex flex-col gap-4">
                <h1>Daftar data yang akan dibuat</h1>
                <DataTable columns={columns} data={dataTemp} />
                {dataTemp?.length > 0 && (
                    <div className="flex gap-2">
                        <DangerButton
                            className="w-24"
                            onClick={() => setDataTemp([])}
                        >
                            RESET
                        </DangerButton>
                        <PrimaryButton className="w-24" disabled={processing}>
                            SIMPAN
                        </PrimaryButton>
                    </div>
                )}
            </div>
        </>
    );
};

export default DosenForm;
