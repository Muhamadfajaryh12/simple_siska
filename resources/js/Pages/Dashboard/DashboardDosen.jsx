import BarContainer from "@/Components/BarContainer";
import BoxCount from "@/Components/BoxCount";
import AdminLayout from "@/Layouts/AdminLayout";
import React, { useEffect, useState } from "react";

const DashboardDosen = ({
    data_mata_kuliah,
    data_fakultas,
    data_prodi,
    data_dosen,
    data_mahasiswa,
}) => {
    const [dosen, setDosen] = useState([]);
    const [mahasiswa, setMahasiswa] = useState([]);
    useEffect(() => {
        const groupByGenderDosen = data_dosen.reduce((acc, item) => {
            if (!acc[item.jenis_kelamin]) {
                acc[item.jenis_kelamin] = [];
            }
            acc[item.jenis_kelamin].push(item);
            return acc;
        }, {});
        const createArrayDosen = Object.keys(groupByGenderDosen).map((item) => {
            const total = groupByGenderDosen[item].length;
            return {
                jenis_kelamin: item,
                total: total,
            };
        });

        const groupByGenderMahasiswa = data_mahasiswa.reduce((acc, item) => {
            if (!acc[item.jenis_kelamin]) {
                acc[item.jenis_kelamin] = [];
            }
            acc[item.jenis_kelamin].push(item);
            return acc;
        }, {});
        const createArrayMahasiswa = Object.keys(groupByGenderMahasiswa).map(
            (item) => {
                const total = groupByGenderMahasiswa[item].length;
                return {
                    jenis_kelamin: item,
                    total: total,
                };
            }
        );
        setMahasiswa(createArrayMahasiswa);
        setDosen(createArrayDosen);
    }, []);

    return (
        <AdminLayout title={"Dashboard"}>
            <div className="flex gap-2">
                <BoxCount title={" Mata Kuliah"} count={data_mata_kuliah} />
                <BoxCount title={" Fakultas"} count={data_fakultas} />
                <BoxCount title={" Program Studi"} count={data_prodi} />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="h-96">
                    <BarContainer
                        datas={dosen}
                        labelKey={"jenis_kelamin"}
                        dataKey={"total"}
                        chartTitle={"Grafik Keseluruhan Dosen"}
                        backgroundColor={[
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(54, 162, 235, 0.6)",
                        ]}
                        chartBackgroundColor="rgba(255, 255, 255, 0.8)"
                    />
                </div>
                <div className="h-96">
                    <BarContainer
                        datas={mahasiswa}
                        labelKey={"jenis_kelamin"}
                        dataKey={"total"}
                        chartTitle={"Grafik Keseluruhan Mahasiswa"}
                        backgroundColor={[
                            "rgba(54, 162, 235, 0.6)",
                            "rgba(255, 99, 132, 0.6)",
                        ]}
                        chartBackgroundColor="rgba(255, 255, 255, 0.8)"
                    />
                </div>
            </div>
        </AdminLayout>
    );
};

export default DashboardDosen;
