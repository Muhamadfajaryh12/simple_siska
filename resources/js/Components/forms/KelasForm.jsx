import React, { useEffect, useState } from "react";
import SelectContent from "../input/SelectContent";
import { useForm } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import PrimaryButton from "../PrimaryButton";
import TextInputContent from "../input/TextInputContent";
import DangerButton from "../DangerButton";
import { FaTrash } from "react-icons/fa6";

const KelasForm = ({ data_mahasiswa, data_kelas, data_dosen, data_prodi }) => {
    const [temp, setTemp] = useState([]);
    const limit = 20;

    const { data, setData, post, errors, reset, processing } = useForm({
        kelas: "",
        angkatan: "",
        prodi_id: "",
        dosen_id: "",
        mahasiswa_id: "",
        data_mahasiswa: [],
    });

    const filterDosen = data.prodi_id
        ? data_dosen?.filter((prev) => prev.prodi_id == data.prodi_id)
        : data_dosen;

    const filterMahasiswa = data.prodi_id
        ? data_mahasiswa.filter((prev) => prev.prodi_id == data.prodi_id)
        : data_mahasiswa;

    const columns = [
        {
            name: "Nama Mahasiswa",
            selector: (row) => row.nama_mahasiswa,
        },
        {
            name: "Kelas",
            selector: (row) => row.kelas,
        },
        {
            name: "Angkatan",
            selector: (row) => row.angkatan,
        },
        {
            name: "Program Studi",
            selector: (row) => row.nama_prodi,
        },
        {
            name: "Dosen Wali",
            selector: (row) => row.nama_dosen,
        },
        {
            name: "Action",
            selector: (row) => (
                <DangerButton
                    key={row.id}
                    onClick={() => handleRemoveTemp(row.id)}
                >
                    <FaTrash />
                </DangerButton>
            ),
        },
    ];

    const payload = {
        ...data,
        nama_mahasiswa:
            data_mahasiswa.find((prev) => prev.id == data.mahasiswa_id)
                ?.nama_mahasiswa || "",
        nama_dosen:
            data_dosen.find((prev) => prev.id == data.dosen_id)?.nama_dosen ||
            "",
        nama_prodi:
            data_prodi.find((prev) => prev.id == data.prodi_id)?.nama_prodi ||
            "",
    };
    const handleAddedTemp = (e) => {
        e.preventDefault();
        const updatedTemp = [...temp, payload];
        setTemp(updatedTemp);
        setData("data_mahasiswa", updatedTemp);
    };

    const handleResetTemp = () => {
        setTemp([]);
    };

    const handleRemoveTemp = (id) => {
        setTemp((prev) => prev.filter((item) => item.id != id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("kelas.store"), {
            onSuccess: () => {},
        });
    };
    return (
        <>
            <form className="flex flex-col gap-4" onSubmit={handleAddedTemp}>
                <div className="grid grid-cols-3 gap-2">
                    <SelectContent
                        valueField={"kelas"}
                        data={data_kelas}
                        labelField={"kelas"}
                        name={"kelas"}
                        label={"Kelas"}
                        value={data.kelas}
                        handleChange={(e) => setData("kelas", e.target.value)}
                    />
                    <TextInputContent
                        type="number"
                        min="1900"
                        max="2100"
                        placeholder="2024"
                        name="angkatan"
                        label="Angkatan"
                        value={data.angkatan}
                        errors={errors.angkatan}
                        onChange={(e) => setData("angkatan", e.target.value)}
                    />
                    <SelectContent
                        valueField={"id"}
                        data={data_prodi}
                        labelField={"nama_prodi"}
                        name={"prodi_id"}
                        label={"Program Studi"}
                        handleChange={(e) =>
                            setData("prodi_id", e.target.value)
                        }
                        value={data.prodi_id}
                        disabled={false}
                    />
                </div>
                <SelectContent
                    valueField={"id"}
                    data={filterDosen}
                    labelField={"nama_dosen"}
                    name={"dosen_id"}
                    label={"Nama Dosen"}
                    value={data.dosen_id}
                    handleChange={(e) => setData("dosen_id", e.target.value)}
                    disabled={!data.prodi_id}
                />
                <SelectContent
                    valueField={"id"}
                    data={filterMahasiswa}
                    labelField={"nama_mahasiswa"}
                    name={"mahasiswa_id"}
                    label={"Nama Mahasiswa"}
                    handleChange={(e) =>
                        setData("mahasiswa_id", e.target.value)
                    }
                    value={data.mahasiswa_id}
                    disabled={!data.prodi_id}
                />
                <PrimaryButton
                    type="submit"
                    disabled={processing || temp.length >= 20}
                >
                    Tambahkan
                </PrimaryButton>
            </form>
            <div className="mt-2">
                {/* <h1>Jumlah mahasiswa per-kelas tersisa {20 - temp.length}</h1> */}
                <DataTable
                    data={temp}
                    columns={columns}
                    pagination
                    fixedHeader
                />
                <div className="flex gap-2">
                    <PrimaryButton onClick={handleSubmit} disabled={processing}>
                        SUBMIT
                    </PrimaryButton>
                    <DangerButton>RESET</DangerButton>
                </div>
            </div>
        </>
    );
};

export default KelasForm;
