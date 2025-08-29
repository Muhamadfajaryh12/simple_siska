import BarChartComponent from "@/Components/chart/BarChartComponent";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import { FaAustralSign, FaBook, FaBuilding, FaUser } from "react-icons/fa6";
import { MdAssignment, MdClass } from "react-icons/md";

const DashboardAdmin = ({
    data_total_mahasiswa,
    data_total_dosen,
    data_total_mata_kuliah,
    data_total_fakultas,
    data_total_prodi,
    data_total_krs,
    data_total_mahasiswa_dosen_group_fakultas,
    data_total_mahasiswa_group_angkatan,
    data_total_pendapatan_group_fakultas,
}) => {
    console.log(data_total_mahasiswa_dosen_group_fakultas);
    return (
        <AdminLayout title={["Dashboard"]}>
            <div className="grid grid-cols-3 gap-4">
                <CardDashboard
                    title={"Jumlah total Mahasiswa/i aktif"}
                    icon={<FaUser size={30} />}
                    value={data_total_mahasiswa}
                    color={"bg-blue-500 text-white"}
                />
                <CardDashboard
                    title={"Jumlah total Dosen aktif"}
                    icon={<FaUser size={30} />}
                    value={data_total_dosen}
                    color={"bg-orange-500 text-white"}
                />
                <CardDashboard
                    title={"Jumlah total Mata Kuliah berjalan"}
                    icon={<FaBook size={30} />}
                    value={data_total_mata_kuliah}
                    color={"bg-red-500 text-white"}
                />
                <CardDashboard
                    title={"Jumlah total Fakultas"}
                    icon={<FaBuilding size={30} />}
                    value={data_total_fakultas}
                    color={"bg-green-500 text-white"}
                />
                <CardDashboard
                    title={"Jumlah total Program Studi"}
                    icon={<MdClass size={30} />}
                    value={data_total_prodi}
                    color={"bg-yellow-500 text-white"}
                />
                <CardDashboard
                    title={"Jumlah total KRS"}
                    icon={<MdAssignment size={30} />}
                    value={data_total_krs}
                    color={"bg-violet-500 text-white"}
                />
            </div>
            <div className="h-96 bg-white rounded-md border w-full mt-4 p-4">
                <BarChartComponent
                    title={"Mahasiswa berdasarkan Fakultas"}
                    chartData={{
                        labels: data_total_mahasiswa_dosen_group_fakultas.map(
                            (item) => item.nama_fakultas
                        ),
                        datasets: [
                            {
                                label: "Mahasiswa",
                                data: data_total_mahasiswa_dosen_group_fakultas.map(
                                    (item) => item.total_mahasiswa
                                ),
                                backgroundColor: "rgba(0, 0, 190, 1)",
                            },
                            {
                                label: "Dosen",
                                data: data_total_mahasiswa_dosen_group_fakultas.map(
                                    (item) => item.total_dosen
                                ),
                                backgroundColor: "rgba(0, 190, 190, 1)",
                            },
                        ],
                    }}
                />
            </div>{" "}
            <div className="h-96 bg-white rounded-md border w-full mt-4 p-4">
                <BarChartComponent
                    title={"Mahasiswa berdasarkan Angkatan"}
                    chartData={{
                        labels: data_total_mahasiswa_group_angkatan.map(
                            (item) => item.angkatan
                        ),
                        datasets: [
                            {
                                label: "Mahasiswa",
                                data: data_total_mahasiswa_group_angkatan.map(
                                    (item) => item.total
                                ),
                                backgroundColor: "rgba(0, 0, 190, 1)",
                            },
                        ],
                    }}
                />
            </div>
            <div className="h-96 bg-white rounded-md border w-full mt-4 p-4">
                <BarChartComponent
                    title={"Pendapatan UKT berdasarkan Fakultas"}
                    chartData={{
                        labels: data_total_pendapatan_group_fakultas.map(
                            (item) => item.nama_fakultas
                        ),
                        datasets: [
                            {
                                label: "Nominal",
                                data: data_total_pendapatan_group_fakultas.map(
                                    (item) => item.total_pendapatan
                                ),
                                backgroundColor: "rgba(0, 0, 190, 1)",
                            },
                        ],
                    }}
                />
            </div>
        </AdminLayout>
    );
};

const CardDashboard = ({ title, icon, value, color }) => {
    return (
        <div className="border rounded-lg bg-white">
            <div className="flex justify-between items-center">
                <div
                    className={`h-24 w-24 flex justify-center items-center rounded-l-lg ${color}`}
                >
                    {icon}
                </div>
                <div className="p-4">
                    <h1>{title}</h1>
                    <h1 className="text-2xl text-end">{value}</h1>
                </div>
            </div>
        </div>
    );
};
export default DashboardAdmin;
