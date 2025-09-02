import React, { useEffect } from "react";
import SelectContent from "../input/SelectContent";
import { useForm } from "@inertiajs/react";
import TextInputContent from "../input/TextInputContent";
import data_jadwal from "@/static/DataJadwal.json";
import data_kelas from "@/static/DataKelas.json";
import PrimaryButton from "../PrimaryButton";
import DataTable from "react-data-table-component";
import DangerButton from "../DangerButton";
import { FaTrash } from "react-icons/fa6";
import SubText from "../SubText";
const KelasMataKuliahForm = ({
    data_dosen,
    data_mata_kuliah,
    detail_kelas_mata_kuliah,
}) => {
    const { setData, data, post, put, processing, reset } = useForm({
        data_kelas_mata_kuliah: [],
    });

    const payload = {
        ...data,
        dosen: data_dosen.find((item) => item.id == data.dosen_id)?.nama_dosen,
        mata_kuliah: data_mata_kuliah.find(
            (item) => item.id == data.mata_kuliah_id
        )?.nama_mata_kuliah,
    };

    useEffect(() => {
        if (detail_kelas_mata_kuliah) {
            setData({
                dosen_id: detail_kelas_mata_kuliah.dosen_id,
                mata_kuliah_id: detail_kelas_mata_kuliah.mata_kuliah_id,
                nama_kelas: detail_kelas_mata_kuliah.nama_kelas,
                jam_mulai: detail_kelas_mata_kuliah.jam_mulai,
                jam_selesai: detail_kelas_mata_kuliah.jam_selesai,
                tahun_ajaran: detail_kelas_mata_kuliah.tahun_ajaran,
                jadwal: detail_kelas_mata_kuliah.jadwal,
                tanggal_mulai: detail_kelas_mata_kuliah.tanggal_mulai,
            });
        }
    }, [detail_kelas_mata_kuliah]);
    const handleAddedTemp = (e) => {
        e.preventDefault();
        setData("data_kelas_mata_kuliah", [
            ...data.data_kelas_mata_kuliah,
            payload,
        ]);
    };

    const handleRemoveTemp = (ids) => {
        const removeData = data.data_kelas_mata_kuliah.filter(
            (item, index) => index != ids
        );
        setData("data_kelas_mata_kuliah", removeData);
    };

    const handleReset = () => {
        reset();
    };

    const handleSubmit = () => {
        post(route("kelas_mata_kuliah.store"), {
            onSuccess: () => {
                // reset();
            },
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        put(
            route("kelas_mata_kuliah.edit", { id: detail_kelas_mata_kuliah.id })
        );
    };

    const columns = [
        {
            name: "Dosen",
            selector: (row) => row.dosen,
        },
        {
            name: "Mata Kuliah",
            selector: (row) => row.mata_kuliah,
        },
        {
            name: "Kelas",
            selector: (row) => row.nama_kelas,
        },
        {
            name: "Tahun Ajaran",
            selector: (row) => row.tahun_ajaran,
        },
        {
            name: "Jadwal",
            selector: (row) => (
                <p>
                    {row.jadwal} ({row.jam_mulai} - {row.jam_selesai})
                </p>
            ),
        },
        {
            name: "Tanggal Mulai",
            selector: (row) => row.tanggal_mulai,
        },
        {
            name: "Action",
            selector: (row, index) => (
                <DangerButton
                    onClick={() => handleRemoveTemp(index)}
                    disabled={processing}
                >
                    <FaTrash />
                </DangerButton>
            ),
        },
    ];
    return (
        <div>
            <SubText text="Formulir Kelas Mata Kuliah" />
            <form
                className="flex flex-col gap-4"
                onSubmit={
                    !detail_kelas_mata_kuliah ? handleAddedTemp : handleUpdate
                }
            >
                <SelectContent
                    data={data_dosen}
                    name={"dosen_id"}
                    label={"Dosen"}
                    labelField={"nama_dosen"}
                    valueField={"id"}
                    value={data.dosen_id}
                    handleChange={(e) => setData("dosen_id", e.target.value)}
                />
                <SelectContent
                    data={data_mata_kuliah}
                    name={"mata_kuliah_id"}
                    label={"Mata Kuliah"}
                    labelField={"nama_mata_kuliah"}
                    valueField={"id"}
                    value={data.mata_kuliah_id}
                    handleChange={(e) =>
                        setData("mata_kuliah_id", e.target.value)
                    }
                />
                <div className="grid grid-cols-2 gap-4">
                    <SelectContent
                        data={data_kelas}
                        name={"nama_kelas"}
                        label={"Kelas"}
                        labelField={"kelas"}
                        valueField={"kelas"}
                        value={data.nama_kelas}
                        handleChange={(e) =>
                            setData("nama_kelas", e.target.value)
                        }
                    />
                    <TextInputContent
                        name={"tahun_ajaran"}
                        label={"Tahun Ajaran"}
                        value={data.tahun_ajaran}
                        onChange={(e) =>
                            setData("tahun_ajaran", e.target.value)
                        }
                        type={"text"}
                    />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <TextInputContent
                        name={"jam_mulai"}
                        label={"Jam Mulai"}
                        value={data.jam_mulai}
                        onChange={(e) => setData("jam_mulai", e.target.value)}
                        type={"time"}
                    />
                    <TextInputContent
                        name={"jam_selesai"}
                        label={"Jam Selesai"}
                        value={data.jam_selesai}
                        onChange={(e) => setData("jam_selesai", e.target.value)}
                        type={"time"}
                    />
                    <SelectContent
                        data={data_jadwal}
                        name={"jadwal"}
                        label={"Jadwal"}
                        labelField={"id"}
                        valueField={"id"}
                        value={data.jadwal}
                        handleChange={(e) => setData("jadwal", e.target.value)}
                    />{" "}
                    <TextInputContent
                        name={"tanggal_mulai"}
                        label={"Tanggal Mulai"}
                        value={data.tanggal_mulai}
                        onChange={(e) =>
                            setData("tanggal_mulai", e.target.value)
                        }
                        type={"date"}
                    />
                </div>
                <PrimaryButton disabled={processing}>
                    {!detail_kelas_mata_kuliah ? "Tambahkan" : "Simpan"}
                </PrimaryButton>
            </form>
            {!detail_kelas_mata_kuliah && (
                <div className="mt-4">
                    <DataTable
                        data={data?.data_kelas_mata_kuliah}
                        columns={columns}
                    />
                    {data?.data_kelas_mata_kuliah?.length > 0 && (
                        <div className="flex gap-2 my-2">
                            <PrimaryButton
                                onClick={handleSubmit}
                                disabled={processing}
                            >
                                SIMPAN
                            </PrimaryButton>
                            <DangerButton
                                onClick={() => handleReset()}
                                disabled={processing}
                            >
                                RESET
                            </DangerButton>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default KelasMataKuliahForm;
