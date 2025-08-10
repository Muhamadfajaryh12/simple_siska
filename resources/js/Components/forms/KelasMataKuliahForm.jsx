import React from "react";
import SelectContent from "../input/SelectContent";
import { useForm } from "@inertiajs/react";
import TextInputContent from "../input/TextInputContent";
import data_jadwal from "@/static/DataJadwal.json";
import data_kelas from "@/static/DataKelas.json";
import PrimaryButton from "../PrimaryButton";
import DataTable from "react-data-table-component";
import DangerButton from "../DangerButton";
import { FaTrash } from "react-icons/fa6";
const KelasMataKuliahForm = ({ data_dosen, data_mata_kuliah }) => {
    const { setData, data, post, processing, reset } = useForm({
        data_kelas_mata_kuliah: [],
    });

    const payload = {
        ...data,
        dosen: data_dosen.find((item) => item.id == data.dosen_id)?.nama_dosen,
        mata_kuliah: data_mata_kuliah.find(
            (item) => item.id == data.mata_kuliah_id
        )?.nama_mata_kuliah,
    };
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
            name: "Action",
            selector: (row, index) => (
                <DangerButton onClick={() => handleRemoveTemp(index)}>
                    <FaTrash />
                </DangerButton>
            ),
        },
    ];
    return (
        <div>
            <form className="flex flex-col gap-4" onSubmit={handleAddedTemp}>
                <SelectContent
                    data={data_dosen}
                    name={"dosen_id"}
                    label={"Dosen"}
                    labelField={"nama_dosen"}
                    valueField={"id"}
                    handleChange={(e) => setData("dosen_id", e.target.value)}
                />
                <SelectContent
                    data={data_mata_kuliah}
                    name={"mata_kuliah_id"}
                    label={"Mata Kuliah"}
                    labelField={"nama_mata_kuliah"}
                    valueField={"id"}
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
                    />{" "}
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <TextInputContent
                        name={"jam_mulai"}
                        label={"Jam Mulai"}
                        value={data.jam_mulai}
                        onChange={(e) => setData("jam_mulai", e.target.value)}
                        type={"time"}
                    />{" "}
                    <TextInputContent
                        name={"jam_selesai"}
                        label={"Jam Selesai"}
                        value={data.jam_selesai}
                        onChange={(e) => setData("jam_selesai", e.target.value)}
                        type={"time"}
                    />{" "}
                    <SelectContent
                        data={data_jadwal}
                        name={"jadwal"}
                        label={"Jadwal"}
                        labelField={"id"}
                        valueField={"id"}
                        handleChange={(e) => setData("jadwal", e.target.value)}
                    />
                </div>
                <PrimaryButton>TAMBAHKAN</PrimaryButton>
            </form>

            <div className="mt-4">
                <DataTable
                    data={data.data_kelas_mata_kuliah}
                    columns={columns}
                />
                {data.data_kelas_mata_kuliah.length > 0 && (
                    <div className="flex gap-2 my-2">
                        <PrimaryButton onClick={handleSubmit}>
                            SIMPAN
                        </PrimaryButton>
                        <DangerButton onClick={() => handleReset()}>
                            RESET
                        </DangerButton>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KelasMataKuliahForm;
