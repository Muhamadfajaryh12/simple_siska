import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const FormCreateMatakuliah = ({
    data_fakultas,
    data_prodi,
    data_dosen,
    data_kelas,
}) => {
    const [temp, setTemp] = useState([]);

    const { data, setData, processing, post, errors, reset } = useForm({
        mata_kuliah: [],
    });
    useEffect(() => {
        setData("mata_kuliah", temp);
    }, [temp]);
    const submit = (e) => {
        e.preventDefault();
        post(route("matakuliah.store"), {
            onSuccess: () => {
                reset();
                setTemp([]);
                console.log("test");
            },
        });
        console.log(errors);

        console.log(errors?.mata_kuliah?.[0]);
        console.log(errors?.mata_kuliah?.[0]?.sks);
    };

    const submitTemp = (e) => {
        e.preventDefault();
        setTemp((prevTemp) => [...prevTemp, data]);
        reset();
    };

    const handleDelete = (index) => {
        setTemp(temp.filter((_, i) => i !== index));
    };
    const dataSemester = [
        {
            id: "1",
        },
        {
            id: "2",
        },
        {
            id: "3",
        },
        {
            id: "4",
        },
        {
            id: "5",
        },
        {
            id: "6",
        },
        {
            id: "7",
        },
        {
            id: "8",
        },
    ];

    const dataJadwal = [
        {
            id: "Senin",
        },
        {
            id: "Selasa",
        },
        {
            id: "Rabu",
        },
        {
            id: "Kamis",
        },
        {
            id: "Jumat",
        },
        {
            id: "Sabtu",
        },
        {
            id: "Minggu",
        },
    ];
    const handleInputChange = (e, row, field) => {
        const updatedTemp = temp.map((item) => {
            if (item === row) {
                return { ...item, [field]: e.target.value };
            }
            return item;
        });
        setTemp(updatedTemp);
    };
    const columns = [
        {
            name: "Nama Mata Kuliah",
            selector: (row) => (
                <TextInput
                    type="text"
                    value={row.nama_mata_kuliah}
                    onChange={(e) =>
                        handleInputChange(e, row, "nama_mata_kuliah")
                    }
                    className="w-full"
                />
            ),
        },
        {
            name: "Jadwal",
            selector: (row) => (
                <Select
                    id="jadwal"
                    name="jadwal"
                    className="w-full"
                    onChange={(e) => handleInputChange(e, row, "jadwal")}
                    data={dataJadwal}
                    valueField="id"
                    labelField="id"
                    value={row.jadwal}
                />
            ),
        },
        {
            name: "Jam Mulai",
            selector: (row) => (
                <TextInput
                    type="time"
                    value={row.jam_mulai}
                    onChange={(e) => handleInputChange(e, row, "jam_mulai")}
                    className="w-full"
                />
            ),
        },
        {
            name: "Jam Selesai",
            selector: (row) => (
                <TextInput
                    type="time"
                    value={row.jam_selesai}
                    onChange={(e) => handleInputChange(e, row, "jam_selesai")}
                    className="w-full"
                />
            ),
        },
        {
            name: "SKS",
            selector: (row, index) => (
                <div>
                    <TextInput
                        type="text"
                        value={row.sks}
                        onChange={(e) => handleInputChange(e, row, "sks")}
                        className="w-full"
                    />
                    <InputError
                        message={errors?.mata_kuliah?.[index]?.sks}
                        className="mt-2"
                    />
                </div>
            ),
        },
        {
            name: "Semester",
            selector: (row) => (
                <TextInput
                    type="text"
                    value={row.semester}
                    onChange={(e) => handleInputChange(e, row, "semester")}
                    className="w-full"
                />
            ),
        },
        {
            name: "Kelas",
            selector: (row) => (
                <Select
                    id="id_kelas"
                    name="id_kelas"
                    className="w-full"
                    onChange={(e) => handleInputChange(e, row, "id_kelas")}
                    data={data_kelas}
                    valueField="id"
                    labelField="nama_kelas"
                    value={row.id_kelas}
                />
            ),
        },
        {
            name: "Fakultas",
            selector: (row) => (
                <Select
                    id="id_fakultas"
                    name="id_fakultas"
                    className="w-full"
                    onChange={(e) => handleInputChange(e, row, "id_fakultas")}
                    data={data_fakultas}
                    valueField="id"
                    labelField="nama_fakultas"
                    value={row.id_fakultas}
                />
            ),
        },
        {
            name: "Prodi",
            selector: (row) => (
                <Select
                    id="id_prodi"
                    name="id_prodi"
                    className="w-full"
                    onChange={(e) => handleInputChange(e, row, "id_prodi")}
                    data={data_prodi}
                    valueField="id"
                    labelField="nama_prodi"
                    value={row.id_prodi}
                />
            ),
        },
        {
            name: "Dosen",
            selector: (row) => (
                <Select
                    id="id_dosen"
                    name="id_dosen"
                    className="w-full"
                    onChange={(e) => handleInputChange(e, row, "id_dosen")}
                    data={data_dosen}
                    valueField="id"
                    labelField="nama"
                    value={row.id_dosen}
                />
            ),
        },
        {
            name: "Action",
            selector: (row, index) => (
                <button
                    className="bg-red-400 p-2 rounded-md text-white font-bold mx-1"
                    onClick={() => handleDelete(index)}
                >
                    Delete
                </button>
            ),
        },
    ];

    return (
        <AdminLayout title={"Create Mata Kuliah"}>
            <form onSubmit={submitTemp}>
                <div className="mt-2">
                    <InputLabel htmlFor="Mata Kuliah" value="Mata Kuliah" />
                    <TextInput
                        id="nama_mata_kuliah"
                        type="text"
                        name="nama_mata_kuliah"
                        className="mt-1 block w-full"
                        placeholder="Mata kuliah"
                        isFocused={true}
                        onChange={(e) =>
                            setData("nama_mata_kuliah", e.target.value)
                        }
                        value={data.nama_mata_kuliah}
                    />
                    <InputError
                        message={errors.nama_mata_kuliah}
                        className="mt-2"
                    />
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <div className="mt-2">
                        <InputLabel
                            htmlFor="Jadwal Kuliah"
                            value="Jadwal Kuliah"
                        />
                        <Select
                            id="jadwal"
                            name="jadwal"
                            className="mt-1 block w-full"
                            onChange={(e) => setData("jadwal", e.target.value)}
                            data={dataJadwal}
                            valueField="id"
                            labelField="id"
                        />
                        <InputError message={errors.jadwal} className="mt-2" />
                    </div>
                    <div className="mt-2">
                        <InputLabel
                            htmlFor="Jam Mulai Kuliah"
                            value="Jam Mulai Kuliah"
                        />
                        <TextInput
                            id="jam_mulai"
                            type="time"
                            name="jam_mulai"
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) =>
                                setData("jam_mulai", e.target.value)
                            }
                            value={data.jam_mulai}
                        />
                        <InputError
                            message={errors.jam_mulai}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-2">
                        <InputLabel
                            htmlFor="Jam Selesai Kuliah"
                            value="Jam Selesai Kuliah"
                        />
                        <TextInput
                            id="jam_selesai"
                            type="time"
                            name="jam_selesai"
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) =>
                                setData("jam_selesai", e.target.value)
                            }
                            value={data.jam_selesai}
                        />
                        <InputError
                            message={errors.jam_selesai}
                            className="mt-2"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <div className="mt-2">
                        <InputLabel htmlFor="SKS" value="SKS" />
                        <TextInput
                            id="sks"
                            type="number"
                            name="sks"
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData("sks", e.target.value)}
                            value={data.sks}
                        />
                        <InputError message={errors.sks} className="mt-2" />
                    </div>
                    <div className="mt-2">
                        <InputLabel htmlFor="Semester" value="Semester" />
                        <Select
                            id="semester"
                            name="semester"
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("semester", e.target.value)
                            }
                            data={dataSemester}
                            valueField="id"
                            labelField="id"
                        />
                        <InputError
                            message={errors.semester}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-2">
                        <InputLabel htmlFor="Kelas" value="Kelas" />
                        <Select
                            id="id_kelas"
                            name="id_kelas"
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("id_kelas", e.target.value)
                            }
                            data={data_kelas}
                            valueField="id"
                            labelField="nama_kelas"
                        />
                        <InputError
                            message={errors.id_kelas}
                            className="mt-2"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="mt-2">
                        <InputLabel htmlFor="Fakultas" value="Fakultas" />
                        <Select
                            id="id_fakultas"
                            name="id_fakultas"
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("id_fakultas", e.target.value)
                            }
                            data={data_fakultas}
                            valueField="id"
                            labelField="nama_fakultas"
                        />
                        <InputError
                            message={errors.id_fakultas}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-2">
                        <InputLabel
                            htmlFor="Program Studi"
                            value="Program Studi"
                        />
                        <Select
                            id="id_prodi"
                            name="id_prodi"
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("id_prodi", e.target.value)
                            }
                            data={data_prodi}
                            valueField="id"
                            labelField="nama_prodi"
                        />
                        <InputError
                            message={errors.id_prodi}
                            className="mt-2"
                        />
                    </div>
                </div>
                <div className="mt-2">
                    <InputLabel
                        htmlFor="Dosen Pengampu"
                        value="Dosen Pengampu"
                    />
                    <Select
                        id="id_dosen"
                        name="id_dosen"
                        className="mt-1 block w-full"
                        onChange={(e) => setData("id_dosen", e.target.value)}
                        data={data_dosen}
                        valueField="id"
                        labelField="nama"
                    />
                    <InputError message={errors.id_dosen} className="mt-2" />
                </div>
                <PrimaryButton className="mt-2" disabled={processing}>
                    Added
                </PrimaryButton>
            </form>
            <div className="">
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
        </AdminLayout>
    );
};

export default FormCreateMatakuliah;
