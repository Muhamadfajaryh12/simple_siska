import SubText from "@/Components/SubText";
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
            <div className="grid grid-cols-4 mb-4 gap-4">
                <div className="bg-white rounded-md p-4">
                    <SubText text={"Dosen Wali"} />
                    <h1 className="font-bold text-2xl">
                        {data_kelas.dosen.nama_dosen}
                    </h1>
                </div>
                <div className="bg-white rounded-md p-4">
                    <SubText text={"Tahun Angkatan"} />
                    <h1 className="font-bold text-2xl">
                        {data_kelas.angkatan}
                    </h1>
                </div>
                <div className="bg-white rounded-md p-4">
                    <SubText text={"Program Studi"} />
                    <h1 className="font-bold text-2xl">
                        {data_kelas.prodi.nama_prodi}
                    </h1>
                </div>
                <div className="bg-white rounded-md p-4">
                    <SubText text={"Kelas"} />
                    <h1 className="font-bold text-2xl">{data_kelas.kelas}</h1>
                </div>
            </div>
            <div className="bg-white rounded-md p-4">
                <SubText text={"Daftar Mahasiswa"} />
                <DataTable
                    data={data_mahasiswa}
                    columns={columns}
                    pagination
                    fixedHeader
                />
            </div>
        </AdminLayout>
    );
};

export default DetailKelas;
