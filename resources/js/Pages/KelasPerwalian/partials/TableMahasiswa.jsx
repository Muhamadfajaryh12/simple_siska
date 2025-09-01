import StatusButton from "@/Components/StatusButton";
import React from "react";

const TableMahasiswa = ({ data_mahasiswa }) => {
    return (
        <table className="w-full text-sm ">
            <thead>
                <tr>
                    <th className="border border-black p-2 uppercase">NIM</th>
                    <th className="border border-black p-2 uppercase">
                        Mahasiswa
                    </th>
                    <th className="border border-black p-2 uppercase">
                        Semester
                    </th>
                    <th className="border border-black p-2 uppercase">
                        Total SKS
                    </th>
                    <th className="border border-black p-2 uppercase">
                        Status
                    </th>
                </tr>
            </thead>
            <tbody>
                {data_mahasiswa?.map((item) => (
                    <tr>
                        <td className="border border-black p-2">{item.nim}</td>
                        <td className="border border-black p-2">
                            {item.nama_mahasiswa}
                        </td>
                        <td className="border border-black p-2 text-center">
                            {item.semester}
                        </td>
                        <td className="border border-black p-2 text-center">
                            {item.total_sks}
                        </td>
                        <td className="border border-black p-2 text-center">
                            <StatusButton>{item.status}</StatusButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableMahasiswa;
