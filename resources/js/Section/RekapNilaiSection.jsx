import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

const RekapNilaiSection = ({ data_rekap }) => {
    console.log(data_rekap);
    return (
        <div className="bg-white rounded-md p-4 border my-4">
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
                    {data_rekap.map((item) => (
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
                            <td className="border p-2 text-center">{0}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RekapNilaiSection;
