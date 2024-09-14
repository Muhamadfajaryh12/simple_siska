import ContentVerify from "@/Components/ContentVerify";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const KrsMahasiswaDetail = ({ auth, datas }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        let filter_data = Object.groupBy(
            datas,
            (mk) => mk.mata_kuliah.semester
        );

        setData(filter_data);
    }, []);

    let columns = [
        {
            name: "Mata Kuliah",
            selector: (row) => row.mata_kuliah.nama_mata_kuliah,
        },
        {
            name: "Kelas",
            selector: (row) => row.mata_kuliah.kelas.nama_kelas,
        },
        {
            name: "Dosen Pengampu",
            selector: (row) => row.mata_kuliah.dosen.nama,
        },
        {
            name: "Jadwal",
            selector: (row) => (
                <p>
                    <span className="font-bold">{row.mata_kuliah.jadwal}</span>{" "}
                    ({row.mata_kuliah.jam_mulai.replace(/:00$/, "")} - {""}
                    {row.mata_kuliah.jam_selesai.replace(/:00$/, "")})
                </p>
            ),
        },
        {
            name: "SKS",
            selector: (row) => row.mata_kuliah.sks,
        },
        {
            name: "Nilai",
            selector: (row) => row.nilai_huruf,
        },
        {
            name: "Status",
            selector: (row) => <ContentVerify verify={row.status_verified} />,
        },
    ];

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
            {Object.keys(data).map((key) => {
                const semesterData = data[key];
                const totalSKS = semesterData.reduce(
                    (acc, item) => acc + item.mata_kuliah.sks,
                    0
                );
                const totalIndexKumulatif = semesterData.reduce((acc, item) => {
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

                const totalIndexPrestasi = (
                    totalIndexKumulatif / totalSKS
                ).toFixed(2);
                return (
                    <div className="py-6" key={key}>
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <div className=" text-gray-900">
                                    <div className="flex justify-between">
                                        <p className="text-lg">
                                            Kartu Rencana Studi Anda
                                        </p>
                                        <p className="text-lg">
                                            Semester {key}
                                        </p>
                                    </div>
                                    <span className="text-sm font-bold">
                                        Berikut Mata Kuliah yang telah diambil!
                                    </span>
                                </div>
                                <DataTable
                                    fixedHeader
                                    columns={columns}
                                    data={semesterData}
                                />
                                <h6 className="text-sm font-bold mt-2">
                                    Total SKS : {totalSKS}
                                </h6>
                                <h6 className="text-sm font-bold mt-2">
                                    Index Prestasi : {totalIndexPrestasi}
                                </h6>
                            </div>
                        </div>
                    </div>
                );
            })}
        </AuthenticatedLayout>
    );
};

export default KrsMahasiswaDetail;
