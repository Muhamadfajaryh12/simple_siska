import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import DataTable from "react-data-table-component";

const DetailKelas = ({ data_kelas, data_mahasiswa }) => {
    const columns = [
        {
            name: "Mahasiswa",
            selector: (row) => row.nama_mahasiswa,
        },
        {
            name: "NIM",
            selector: (row) => row.nim,
        },
    ];
    return (
        <AdminLayout title={["Kelas", "Detail", `${data_kelas.kelas}`]}>
            <table>
                <tbody>
                    <tr>
                        <td>Dosen Wali</td>
                        <td> : {data_kelas.dosen.nama_dosen}</td>
                    </tr>
                    <tr>
                        <td>Angkatan</td>
                        <td> : {data_kelas.angkatan}</td>
                    </tr>
                    <tr>
                        <td>Program Studi</td>
                        <td> : {data_kelas.prodi.nama_prodi}</td>
                    </tr>
                </tbody>
            </table>
            <DataTable
                data={data_mahasiswa}
                columns={columns}
                pagination
                fixedHeader
            />
        </AdminLayout>
    );
};

export default DetailKelas;
