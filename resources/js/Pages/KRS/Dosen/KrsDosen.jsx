import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const KrsDosen = ({ data }) => {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        setDatas(data.filter((item) => item.status_verified == null));
    }, []);

    const filterPenilaian = () => {
        setDatas(
            data.filter(
                (item) =>
                    item.status_verified != null && item.nilai_angka == null
            )
        );
    };

    const filterVerfikasi = () => {
        setDatas(data.filter((item) => item.status_verified == null));
    };
    const columns = [
        {
            name: "Nama",
            selector: (row) => row.nama,
        },
        {
            name: "Semester",
            selector: (row) => row.semester,
        },
        {
            name: "Program Studi",
            selector: (row) => row.nama_prodi,
        },
        {
            name: "Action",
            selector: (row) =>
                row.status_verified != null ? (
                    <Link
                        href={`/penilaian_krs/${row.id_user}/${row.semester}`}
                    >
                        <button className="bg-green-400 text-white font-bold p-2 rounded-md">
                            Lakukan Penilaian
                        </button>
                    </Link>
                ) : (
                    <Link
                        href={`/verifikasi_krs/${row.id_user}/${row.semester}`}
                    >
                        <button className="bg-green-400 text-white font-bold p-2 rounded-md">
                            Lakukan Verifikasi
                        </button>
                    </Link>
                ),
        },
    ];
    return (
        <AdminLayout title={"Kartu Rencana Studi"}>
            <div className="m-2">
                <button
                    className="bg-gray-200 p-2 mx-1 rounded-md text-sm font-bold"
                    onClick={filterVerfikasi}
                >
                    Verifikasi
                </button>
                <button
                    className="bg-gray-200 p-2 mx-1 rounded-md text-sm font-bold"
                    onClick={filterPenilaian}
                >
                    Penilaian
                </button>
            </div>
            <DataTable data={datas} columns={columns} />
        </AdminLayout>
    );
};

export default KrsDosen;
