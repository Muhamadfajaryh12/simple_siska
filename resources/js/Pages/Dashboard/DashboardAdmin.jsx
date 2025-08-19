import BarChartComponent from "@/Components/chart/BarChartComponent";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import { FaUser } from "react-icons/fa6";

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
                />
                <CardDashboard
                    title={"Jumlah total Dosen aktif"}
                    icon={<FaUser size={30} />}
                    value={data_total_dosen}
                />
                <CardDashboard
                    title={"Jumlah total Mata Kuliah berjalan"}
                    icon={<FaUser size={30} />}
                    value={data_total_mata_kuliah}
                />{" "}
                <CardDashboard
                    title={"Jumlah total Fakultas"}
                    icon={<FaUser size={30} />}
                    value={data_total_fakultas}
                />
                <CardDashboard
                    title={"Jumlah total Program Studi"}
                    icon={<FaUser size={30} />}
                    value={data_total_prodi}
                />
                <CardDashboard
                    title={"Jumlah total KRS"}
                    icon={<FaUser size={30} />}
                    value={data_total_krs}
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

const CardDashboard = ({ title, icon, value }) => {
    return (
        <div className="p-4 bg-white rounded border shadow-sm">
            <h1>{title}</h1>

            <div className="flex justify-between items-center my-4">
                {icon}
                <h1 className="text-2xl">{value}</h1>
            </div>
        </div>
    );
};
export default DashboardAdmin;
