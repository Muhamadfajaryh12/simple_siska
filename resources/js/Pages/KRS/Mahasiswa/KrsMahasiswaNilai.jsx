import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const NilaiMahasiswa = ({ data_krs, auth }) => {
    const totalSKS = data_krs.reduce(
        (acc, item) => acc + item.mata_kuliah.sks,
        0
    );

    const totalIndexKumulatif = data_krs.reduce((acc, item) => {
        let index = 0;

        if (item.nilai_huruf === "A") {
            index = 4;
        } else if (item.nilai_huruf === "B") {
            index = 3;
        } else if (item.nilai_huruf === "C") {
            index = 2;
        } else if (item.nilai_huruf === "D") {
            index = 1;
        } else {
            index = 0;
        }

        return acc + index * item.mata_kuliah.sks;
    }, 0);

    const totalIndexPrestasi = (totalIndexKumulatif / totalSKS).toFixed(2);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Kartu Rencana Studi
                </h2>
            }
        >
            <Head title="Kartu Rencana Studi" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className=" text-gray-900 my-2">
                            <p className="text-lg">Nilai Kartu Rencana Studi</p>
                            <span className="text-sm font-bold">
                                Berikut merupakan keseluruhan nilai anda
                            </span>
                        </div>
                        <PrimaryButton>Unduh KRS</PrimaryButton>
                        <table className="border-collapse border border-slate-400 w-full ">
                            <thead>
                                <tr>
                                    <th className="border border-black p-2">
                                        Mata Kuliah
                                    </th>
                                    <th className="border border-black p-2">
                                        Jumlah SKS
                                    </th>
                                    <th className="border border-black p-2">
                                        Nilai
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data_krs.map((item) => (
                                    <tr>
                                        <td className="border border-black">
                                            <p className="ml-2">
                                                {
                                                    item.mata_kuliah
                                                        .nama_mata_kuliah
                                                }
                                            </p>
                                        </td>
                                        <td className="border border-black text-center">
                                            {item.mata_kuliah.sks}
                                        </td>
                                        <td className="border border-black text-center">
                                            {item.nilai_huruf}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="my-4">
                            <div className="grid grid-cols-10 font-bold">
                                <h6>Total SKS</h6>
                                <h6>: {totalSKS}</h6>
                            </div>
                            <div className="grid grid-cols-10 font-bold">
                                <h6>Index Kumulatif</h6>
                                <h6>: {totalIndexKumulatif}</h6>
                            </div>
                            <div className="grid grid-cols-10 font-bold">
                                <h6>Index Prestasi</h6>
                                <h6>: {totalIndexPrestasi}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default NilaiMahasiswa;
