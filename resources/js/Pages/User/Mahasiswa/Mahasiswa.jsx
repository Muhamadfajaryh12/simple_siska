import AdminLayout from "@/Layouts/AdminLayout";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const Mahasiswa = ({ data, data_prodi }) => {
    const [dataMahasiswa, setDataMahasiswa] = useState([]);
    const [active, setActive] = useState(null);

    useEffect(() => {
        setDataMahasiswa(data);
    }, [data]);

    const filterDataMahasiswa = (value) => {
        const filter = data.filter((item) => item.id_prodi == value);
        setDataMahasiswa(filter);
        setActive(value);
    };

    let index = 0;
    const columns = [
        {
            name: "No",
            selector: (row) => ++index,
        },
        {
            name: "Nama",
            selector: (row) => row.nama,
        },
        {
            name: "Nomor Induk",
            selector: (row) => row.nomor_induk,
        },
        {
            name: "Program Studi",
            selector: (row) => row.prodi.nama_prodi,
        },
        {
            name: "Jenis Kelamin",
            selector: (row) => row.jenis_kelamin,
        },
        {
            name: "Action",
            selector: (row) => (
                <div>
                    <button className="bg-blue-400 p-2 rounded-md text-white font-bold mx-1">
                        Update
                    </button>
                    <button className="bg-red-400 p-2 rounded-md text-white font-bold mx-1">
                        Delete
                    </button>
                </div>
            ),
        },
    ];
    return (
        <div>
            <AdminLayout title={"Master Mahasiswa"}>
                <div className="my-2">
                    {data_prodi.map((item) => (
                        <button
                            className={` p-2 rounded-lg mx-1 ${
                                item.id == active
                                    ? "bg-gray-300"
                                    : "bg-gray-200"
                            }`}
                            onClick={() => filterDataMahasiswa(item.id)}
                            key={item.id}
                        >
                            <p className="text-xs">{item.nama_prodi}</p>
                        </button>
                    ))}
                </div>
                <DataTable
                    columns={columns}
                    data={dataMahasiswa}
                    fixedHeader
                    pagination
                />
            </AdminLayout>
        </div>
    );
};

export default Mahasiswa;
