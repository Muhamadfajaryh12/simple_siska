import BarChartComponent from "@/Components/chart/BarChartComponent";
import SubText from "@/Components/SubText";
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
                    title={"Total Mahasiswa/i aktif"}
                    icon={<FaUser size={30} />}
                    value={data_total_mahasiswa}
                    color={"bg-blue-500 "}
                />
                <CardDashboard
                    title={"Total Dosen aktif"}
                    icon={<FaUser size={30} />}
                    value={data_total_dosen}
                    color={"bg-orange-500 "}
                />
                <CardDashboard
                    title={"Total Mata Kuliah berjalan"}
                    icon={<FaBook size={30} />}
                    value={data_total_mata_kuliah}
                    color={"bg-red-500 "}
                />
                <CardDashboard
                    title={"Total Fakultas"}
                    icon={<FaBuilding size={30} />}
                    value={data_total_fakultas}
                    color={"bg-green-500 "}
                />
                <CardDashboard
                    title={"Total Program Studi"}
                    icon={<MdClass size={30} />}
                    value={data_total_prodi}
                    color={"bg-yellow-500 text-white"}
                />
                <CardDashboard
                    title={"Total KRS"}
                    icon={<MdAssignment size={30} />}
                    value={data_total_krs}
                    color={"bg-violet-500 "}
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
        <div className=" rounded-lg bg-white p-4">
            <SubText text={title} />
            <h1 className="text-5xl text-blue-900 font-extrabold ">{value}</h1>
        </div>
    );
};
export default DashboardAdmin;
