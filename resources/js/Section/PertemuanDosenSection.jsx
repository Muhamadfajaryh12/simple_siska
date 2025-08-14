import TextInputContent from "@/Components/input/TextInputContent";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";

const PertemuanDosenSection = ({ data_pertemuan, total_mahasiswa }) => {
    const { data, setData, put, processing } = useForm({
        materi: "",
    });

    useEffect(() => {
        setData("materi", data_pertemuan?.materi || "");
    }, [data_pertemuan.id]);

    const handleEdit = (e) => {
        e.preventDefault();
        put(route("pertemuan.edit", { id: data_pertemuan.id }));
    };

    return (
        <div className="my-4">
            <form
                className="flex flex-col gap-4 border rounded-md p-4"
                onSubmit={handleEdit}
            >
                <h1 className="block font-medium text-sm text-gray-700">
                    Tanggal Perkeluliahan : {data_pertemuan.tanggal}
                </h1>
                <TextInputContent
                    label={"Materi"}
                    type={"text"}
                    name={"materi"}
                    value={data.materi}
                    onChange={(e) => setData("materi", e.target.value)}
                />
                <PrimaryButton disabled={processing}>SIMPAN</PrimaryButton>
            </form>
            <div className="grid grid-cols-3 gap-4 my-4">
                <div className="border rounded-md h-12 flex justify-between items-center p-4">
                    <h1>Total Mahasiswa</h1>
                    <h1>{total_mahasiswa}</h1>
                </div>
                <div className="border rounded-md h-12 flex justify-between items-center p-4">
                    <h1>Hadir</h1>
                    <h1>{data_pertemuan.total_hadir}</h1>
                </div>
                <div className="border rounded-md h-12 flex justify-between items-center p-4">
                    <h1>Izin</h1>
                    <h1>{data_pertemuan.total_izin}</h1>
                </div>
            </div>
            <h1 className="my-2 font-semibold">Daftar Absensi</h1>

            <DataTable
                data={data_pertemuan.absensi}
                columns={[
                    {
                        name: "NIM",
                        selector: (row) => row.mahasiswa.nim,
                    },
                    {
                        name: "Mahasiswa",
                        selector: (row) => row.mahasiswa.nama_mahasiswa,
                    },
                    {
                        name: "Status",
                        selector: (row) => (
                            <p className="uppercase p-2 rounded-md bg-green-500 text-white text-xs">
                                {row.status}
                            </p>
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default PertemuanDosenSection;
