import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import TextInputContent from "../input/TextInputContent";
import SelectContent from "../input/SelectContent";
import DangerButton from "../DangerButton";
import { FaTrash } from "react-icons/fa6";

const MataKuliahForm = ({
    data_prodi,
    data_dosen,
    data_kelas,
    data_jadwal,
    data_semester,
    data_mata_kuliah,
}) => {
    const [temp, setTemp] = useState([]);
    const [dataTemp, setDataTemp] = useState([]);
    const { data, setData, processing, post, put, errors, reset } = useForm({
        nama_mata_kuliah: "",
        jadwal: "",
        jam_mulai: "",
        jam_selesai: "",
        sks: "",
        kode_mata_kuliah: "",
        prodi_id: "",
        dosen_id: "",
        kelas: "",
        semester: "",
    });

    const payload = {
        ...data,
        dosen:
            data_dosen.find((item) => item.id == data?.dosen_id)?.nama_dosen ||
            "",
        prodi:
            data_prodi.find((item) => item.id == data?.prodi_id)?.nama_prodi ||
            "",
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("mata_kuliah.store", { data: dataTemp }), {
            onSuccess: () => {
                setTemp([]);
                setDataTemp([]);
            },
        });
    };

    const handleAddTemp = (e) => {
        e.preventDefault();
        setTemp((prevTemp) => [...prevTemp, payload]);
        setDataTemp((prev) => [
            ...prev,
            {
                ...data,
            },
        ]);
        reset();
    };

    const handleDeleteTemp = (index) => {
        setTemp(temp.filter((prev, i) => i != index));
        setDataTemp(temp.filter((prev, i) => i != index));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route("mata_kuliah.edit", { id: data_mata_kuliah.id }));
    };

    useEffect(() => {
        if (data_mata_kuliah) {
            setData({
                nama_mata_kuliah: data_mata_kuliah.nama_mata_kuliah,
                sks: data_mata_kuliah.sks,
                semester: data_mata_kuliah.semester,
                dosen_id: data_mata_kuliah.dosen_id,
                prodi_id: data_mata_kuliah.prodi_id,
                kelas: data_mata_kuliah.kelas,
                kode_mata_kuliah: data_mata_kuliah.kode_mata_kuliah,
                jadwal: data_mata_kuliah.jadwal,
                jam_mulai: data_mata_kuliah.jam_mulai,
                jam_selesai: data_mata_kuliah.jam_selesai,
            });
        }
    }, [data_mata_kuliah]);

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
            name: "Kode MK",
            selector: (row) => row.kode_mata_kuliah,
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
                <DangerButton onClick={() => handleDeleteTemp(index)}>
                    <FaTrash />
                </DangerButton>
            ),
        },
    ];

    return (
        <>
            <form
                onSubmit={!data_mata_kuliah ? handleAddTemp : handleUpdate}
                className="flex flex-col gap-4"
            >
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
                        valueField={"kelas"}
                        labelField={"kelas"}
                        name={"kelas"}
                        errors={errors.kelas}
                        handleChange={(e) => setData("kelas", e.target.value)}
                        value={data.kelas}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <SelectContent
                        label={"Program Studi"}
                        data={data_prodi}
                        valueField={"id"}
                        labelField={"nama_prodi"}
                        name={"prodi_id"}
                        errors={errors.prodi_id}
                        handleChange={(e) =>
                            setData("prodi_id", e.target.value)
                        }
                        value={data.prodi_id}
                    />{" "}
                    <SelectContent
                        label={"Dosen Pengampu"}
                        data={data_dosen}
                        valueField={"id"}
                        labelField={"nama_dosen"}
                        name={"dosen_id"}
                        errors={errors.dosen_id}
                        handleChange={(e) =>
                            setData("dosen_id", e.target.value)
                        }
                        value={data.dosen_id}
                    />{" "}
                    <TextInputContent
                        label={"Kode Mata Kuliah"}
                        type={"text"}
                        name={"kode_mata_kuliah"}
                        onChange={(e) =>
                            setData("kode_mata_kuliah", e.target.value)
                        }
                        value={data.kode_mata_kuliah}
                        errors={errors.kode_mata_kuliah}
                    />
                </div>

                <PrimaryButton className="mt-2 w-32" disabled={processing}>
                    {!data_mata_kuliah ? "Tambahkan" : "Simpan"}
                </PrimaryButton>
            </form>
            {!data_mata_kuliah && (
                <div className="mt-4">
                    {temp.length > 0 && (
                        <>
                            <DataTable
                                fixedHeader
                                pagination
                                data={temp}
                                columns={columns}
                            />
                            <div className="flex gap-2">
                                <DangerButton
                                    type="button "
                                    onClick={() => setTemp([])}
                                >
                                    Reset
                                </DangerButton>
                                <PrimaryButton
                                    className="mt-2"
                                    disabled={processing}
                                    onClick={submit}
                                >
                                    Submit
                                </PrimaryButton>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default MataKuliahForm;
