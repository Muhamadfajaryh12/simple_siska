import SecondaryButton from "@/Components/SecondaryButton";
import AdminLayout from "@/Layouts/AdminLayout";
import axios from "axios";
import React, { useState } from "react";

const RekapNilaiSection = ({ id, data_rekap }) => {
    const [data, setData] = useState(data_rekap.data || []);

    const handleGenerateNilai = async () => {
        try {
            const response = await axios.post(`/generate/${id}`);
            setData(response.data.data);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-white rounded-md p-4 border my-4">
            <SecondaryButton
                className="mb-4"
                onClick={() => handleGenerateNilai()}
            >
                ASYNC NILAI
            </SecondaryButton>
            <table className="table-bordered w-full">
                <thead>
                    <tr>
                        <th className="border p-2">NIM</th>
                        <th className="border p-2">Mahasiswa</th>
                        <th className="border p-2">Absen</th>
                        <th className="border p-2">Tugas</th>
                        <th className="border p-2">UTS</th>
                        <th className="border p-2">UAS</th>
                        <th className="border p-2">Nilai Akhir</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item) => (
                        <tr>
                            <td className="border p-2">{item.nim}</td>
                            <td className="border p-2">
                                {item.nama_mahasiswa}
                            </td>
                            <td className="border p-2 text-center">
                                {item.absen || 0}
                            </td>
                            <td className="border p-2 text-center">
                                {item.tugas || 0}
                            </td>
                            <td className="border p-2 text-center">
                                {item.uts || 0}
                            </td>
                            <td className="border p-2 text-center">
                                {item.uas || 0}
                            </td>
                            <td className="border p-2 text-center">
                                {item.nilai_total || 0}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RekapNilaiSection;
