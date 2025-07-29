import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import TextInputContent from "../input/TextInputContent";
import SelectContent from "../input/SelectContent";
import DangerButton from "../DangerButton";

const MataKuliahForm = ({
    data_fakultas,
    data_prodi,
    data_dosen,
    data_kelas,
    data_jadwal,
    data_semester,
}) => {
    const [temp, setTemp] = useState([]);
    const { data, setData, processing, post, errors, reset } = useForm({
        nama_mata_kuliah: "",
        jadwal: "",
        jam_mulai: "",
        jam_selesai: "",
        sks: "",
        fakultas: "",
        prodi: "",
        dosen: "",
        semester: "",
        kelas: "",
    });

    useEffect(() => {
        setData("mata_kuliah", temp);
    }, [temp]);

    const payload = {
        ...data,
        fakultas:
            data_fakultas.find((item) => item.id == data?.fakultas)
                ?.nama_fakultas || "",
        dosen: data_dosen.find((item) => item.id == data?.dosen)?.nama || "",
        prodi:
            data_prodi.find((item) => item.id == data?.prodi)?.nama_prodi || "",
    };
    const submit = (e) => {
        e.preventDefault();
        post(route("matakuliah.store"), {
            onSuccess: () => {
                reset();
                setTemp([]);
            },
        });
    };

    const submitTemp = (e) => {
        e.preventDefault();
        setTemp((prevTemp) => [...prevTemp, payload]);
        reset();
    };

    const handleDelete = (index) => {
        setTemp(temp.filter((prev, i) => i != index));
    };

    const columns = [
        {
            name: "Mata Kuliah",
            selector: (row) => row.nama_mata_kuliah,
        },
        {
            name: "Jadwal",
            selector: (row) => (
                <span>
                    {row.jadwal} ({row.jam_mulai} - {row.jam_selesai})
                </span>
            ),
        },
        {
            name: "SKS",
            selector: (row) => row.sks,
        },
        {
            name: "Semester",
            selector: (row) => row.semester,
        },
        {
            name: "Kelas",
            selector: (row) => row.kelas,
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
            name: "Dosen",
            selector: (row) => row.dosen,
        },
        {
            name: "Action",
            selector: (row, index) => (
                <DangerButton onClick={() => handleDelete(index)}>
                    Delete
                </DangerButton>
            ),
        },
    ];

    return (
        <>
            <form onSubmit={submitTemp} className="flex flex-col gap-4">
                <TextInputContent
                    label={"Nama Mata Kuliah"}
                    type={"text"}
                    name={"nama_mata_kuliah"}
                    onChange={(e) =>
                        setData("nama_mata_kuliah", e.target.value)
                    }
                    value={data.nama_mata_kuliah}
                    errors={errors.mata_kuliah}
                />
                <div className="grid grid-cols-3 gap-4">
                    <SelectContent
                        label={"Jadwal"}
                        data={data_jadwal}
                        valueField={"id"}
                        labelField={"id"}
                        name={"jadwal"}
                        errors={errors.jadwal}
                        handleChange={(e) => setData("jadwal", e.target.value)}
                        value={data.jadwal}
                    />
                    <TextInputContent
                        label={"Jam Mulai"}
                        type={"time"}
                        name={"jam_mulai"}
                        onChange={(e) => setData("jam_mulai", e.target.value)}
                        value={data.jam_mulai}
                        errors={errors.jam_mulai}
                    />
                    <TextInputContent
                        label={"Jam Selesai"}
                        type={"time"}
                        name={"jam_selesai"}
                        onChange={(e) => setData("jam_selesai", e.target.value)}
                        value={data.jam_selesai}
                        errors={errors.jam_selesai}
                    />
                    <TextInputContent
                        label={"Satuan Kredit"}
                        type={"number"}
                        name={"sks"}
                        onChange={(e) => setData("sks", e.target.value)}
                        value={data.sks}
                        errors={errors.sks}
                    />
                    <SelectContent
                        label={"Semester"}
                        data={data_semester}
                        valueField={"id"}
                        labelField={"id"}
                        name={"semester"}
                        errors={errors.semester}
                        handleChange={(e) =>
                            setData("semester", e.target.value)
                        }
                        value={data.semester}
                    />
                    <SelectContent
                        label={"Kelas"}
                        data={data_kelas}
                        valueField={"nama_kelas"}
                        labelField={"nama_kelas"}
                        name={"kelas"}
                        errors={errors.kelas}
                        handleChange={(e) => setData("kelas", e.target.value)}
                        value={data.kelas}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <SelectContent
                        label={"Fakultas"}
                        data={data_fakultas}
                        valueField={"id"}
                        labelField={"nama_fakultas"}
                        name={"fakultas"}
                        errors={errors.fakultas}
                        handleChange={(e) =>
                            setData("fakultas", e.target.value)
                        }
                        value={data.fakultas}
                    />
                    <SelectContent
                        label={"Program Studi"}
                        data={data_prodi}
                        valueField={"id"}
                        labelField={"nama_prodi"}
                        name={"prodi"}
                        errors={errors.prodi}
                        handleChange={(e) => setData("prodi", e.target.value)}
                        value={data.prodi}
                    />
                </div>
                <SelectContent
                    label={"Dosen Pengampu"}
                    data={data_dosen}
                    valueField={"id"}
                    labelField={"nama"}
                    name={"dosen"}
                    errors={errors.dosen}
                    handleChange={(e) => setData("dosen", e.target.value)}
                    value={data.dosen}
                />
                <PrimaryButton className="mt-2" disabled={processing}>
                    Added
                </PrimaryButton>
            </form>
            <div className="mt-4">
                <DangerButton type="button" onClick={() => setTemp([])}>
                    Reset
                </DangerButton>
                <DataTable
                    fixedHeader
                    pagination
                    data={temp}
                    columns={columns}
                />
                {temp.length > 0 ? (
                    <PrimaryButton
                        className="mt-2"
                        disabled={processing}
                        onClick={submit}
                    >
                        Submit
                    </PrimaryButton>
                ) : (
                    ""
                )}
            </div>
        </>
    );
};

export default MataKuliahForm;
