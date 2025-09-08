import BarChartComponent from "@/Components/chart/BarChartComponent";
import DoughnutChartComponent from "@/Components/chart/DoughnutChartComponent";
import SubText from "@/Components/SubText";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import { CiLock, CiPhone } from "react-icons/ci";
import { FaClock, FaPhone, FaUser } from "react-icons/fa6";
import { MdContactPhone, MdEmail } from "react-icons/md";

const DashboardMahasiswa = ({
    data_total_sks_ipk,
    data_ips,
    data_profile,
    data_jadwal,
}) => {
    console.log(data_profile);
    return (
        <AdminLayout title={["Dashboard"]}>
            <div className="flex gap-4">
                <div className="flex flex-col gap-4 w-full">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white rounded-md p-4 h-32">
                            <SubText text="Indeks Kumulatif Prestasi" />
                            <h1 className="mt-4 text-4xl font-extrabold text-blue-900">
                                {data_total_sks_ipk.ipk}
                            </h1>
                        </div>
                        <div className="bg-white rounded-md p-4 h-32">
                            <SubText text="SKS Ditempuh" />{" "}
                            <h1 className="mt-4 text-4xl font-extrabold text-blue-900">
                                {data_total_sks_ipk.total_krs}
                            </h1>
                        </div>
                        <div className="bg-white rounded-md p-4 h-32">
                            <SubText text="Status Mahasiswa" />
                            <h1 className="mt-4 text-4xl font-extrabold text-blue-900 capitalize">
                                {data_profile.status}
                            </h1>
                        </div>
                    </div>
                    <div className="w-full h-72 bg-white rounded-md p-4">
                        <div className="flex gap-2 items-center">
                            <div className="bg-green-600 h-4 w-4"></div>
                            <h1 className="text-lg font-extrabold tracking-wide m-0 p-0">
                                Indeks Prestasi Semester
                            </h1>
                        </div>
                        <div className="h-56">
                            <BarChartComponent
                                chartData={{
                                    labels: data_ips.map(
                                        (item) => `Smt ${item.semester}`
                                    ),
                                    datasets: [
                                        {
                                            label: "IPS",
                                            data: data_ips.map(
                                                (item) => item.ipk
                                            ),
                                            backgroundColor:
                                                "rgba(0, 0, 66, 1)",
                                        },
                                    ],
                                }}
                            />
                        </div>
                    </div>

                    <div className="w-full h-56 bg-white rounded-md p-4 overflow-y-auto">
                        <SubText text={"Jadwal kuliah hari ini"} />
                        {data_jadwal?.length > 0 ? (
                            data_jadwal.map((item) => (
                                <div className="rounded-md bg-blue-100 p-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <h1 className="font-bold">
                                                {item.nama_mata_kuliah}
                                            </h1>
                                            <h1 className="font-bold">
                                                {item.sks} SKS
                                            </h1>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <FaUser />
                                            <h6>{item.nama_dosen}</h6>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <FaClock />
                                            <h6>
                                                {item.jam_mulai} -{" "}
                                                {item.jam_selesai}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center justify-center bg-green-200 border-green-500 border rounded-md p-4">
                                <h1>Tidak ada jadwal perkuliahan hari ini!</h1>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-4 ">
                    <div className="bg-white rounded-md h-96 w-80 p-4">
                        <SubText text="Informasi Pengguna" />
                        <div className="flex flex-col gap-4 mt-10">
                            <div className="rounded-full w-32 h-32 bg-gray-300 flex items-center justify-center mx-auto">
                                <FaUser size={40} />
                            </div>
                            <h1 className="font-bold text-center size-2xl">
                                {data_profile.nama_mahasiswa}
                            </h1>
                            <div className="">
                                <div className="flex gap-2 items-center my-2">
                                    <div className="bg-blue-900 p-2 rounded-md">
                                        <MdEmail className="text-white" />
                                    </div>
                                    <h1>{data_profile.user.email}</h1>
                                </div>
                                <div className="flex gap-2 items-center my-2">
                                    <div className="bg-blue-900 p-2 rounded-md">
                                        <FaPhone className="text-white" />
                                    </div>
                                    <h1>{data_profile.contact}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-md h-96 w-80 p-4">
                        <SubText text="Masa Studi" />
                        <div className="h-72">
                            <DoughnutChartComponent
                                chartData={{
                                    labels: [
                                        "Sisa Masa Studi",
                                        "Studi yang ditempuh",
                                    ],
                                    datasets: [
                                        {
                                            label: "Mahasiswa",
                                            data: [
                                                8 - data_profile.semester,
                                                data_profile.semester,
                                            ],
                                            backgroundColor: [
                                                "rgba(238, 238, 238, 1)",
                                                "rgba(0, 0, 66, 1)",
                                            ],
                                        },
                                    ],
                                }}
                                title={`${data_profile.semester} Semester telah ditempuh`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default DashboardMahasiswa;
