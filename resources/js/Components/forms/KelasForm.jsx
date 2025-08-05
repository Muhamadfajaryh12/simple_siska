import React, { useEffect, useState } from "react";
import SelectContent from "../input/SelectContent";
import { useForm } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import PrimaryButton from "../PrimaryButton";

const KelasForm = ({ data_mahasiswa, data_kelas, data_dosen, data_prodi }) => {
    const [temp, setTemp] = useState([]);
    const limit = 20;

    const { data, setData, post, errors, reset, processing } = useForm({
        nama_kelas: "",
        prodi_id: "",
        dosen_id: "",
        mahasiswa_id: "id",
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
            name: "Program Studi",
            selector: (row) => row.nama_prodi,
        },
        {
            name: "Dosen Wali",
            selector: (row) => row.nama_dosen,
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
        setTemp((prev) => [...prev, payload]);
        console.log(temp);
    };
    return (
        <>
            <form className="flex flex-col gap-4" onSubmit={handleAddedTemp}>
                <div className="grid grid-cols-2 gap-2">
                    <SelectContent
                        valueField={"kelas"}
                        data={data_kelas}
                        labelField={"kelas"}
                        name={"kelas"}
                        label={"Kelas"}
                        value={data.kelas}
                        handleChange={(e) => setData("kelas", e.target.value)}
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

            {/* <h1>Jumlah mahasiswa per-kelas tersisa {20 - temp.length}</h1> */}
            <DataTable data={temp} columns={columns} pagination fixedHeader />
        </>
    );
};

export default KelasForm;
