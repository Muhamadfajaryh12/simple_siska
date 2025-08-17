import DangerButton from "@/Components/DangerButton";
import TugasForm from "@/Components/forms/TugasForm";
import TextInputContent from "@/Components/input/TextInputContent";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useModal } from "@/Context/ModalContext";
import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaPencil, FaTrash } from "react-icons/fa6";

const PertemuanDosenSection = ({ data_pertemuan, total_mahasiswa }) => {
    console.log(data_pertemuan);
    const { data, setData, put, processing } = useForm({
        materi: "",
    });

    const { showModal } = useModal();
    useEffect(() => {
        setData("materi", data_pertemuan?.materi || "");
    }, [data_pertemuan.id]);

    const handleEdit = (e) => {
        e.preventDefault();
        put(route("pertemuan.edit", { id: data_pertemuan.id }));
    };

    const handleModalTugas = () => {
        showModal(<TugasForm id={data_pertemuan.id} />);
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

            <div className="border rounded-md p-4 my-4">
                {data_pertemuan.tugas ? (
                    <>
                        <h1>
                            Judul Tugas : {data_pertemuan.tugas.judul_tugas}
                        </h1>
                        <h1>Desksripsi : {data_pertemuan.tugas.deskripsi}</h1>
                        <h1>Deadline : {data_pertemuan.tugas.deadline}</h1>
                        <div className="flex justify-end gap-2">
                            <SecondaryButton>
                                <FaPencil />
                            </SecondaryButton>
                            <DangerButton>
                                <FaTrash />
                            </DangerButton>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-center">
                            Pertemuan ini belum memiliki tugas
                        </h1>
                        <div className="flex justify-center my-2">
                            <SecondaryButton onClick={handleModalTugas}>
                                Membuat TUgas
                            </SecondaryButton>
                        </div>
                    </>
                )}
            </div>
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
