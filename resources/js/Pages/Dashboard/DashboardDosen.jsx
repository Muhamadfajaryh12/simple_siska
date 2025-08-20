import AdminLayout from "@/Layouts/AdminLayout";
import FullCalendar from "@fullcalendar/react";
import { FaClapperboard, FaUser } from "react-icons/fa6";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useState } from "react";
const DashboardDosen = ({
    total_kelas_mata_kuliah,
    total_mahasiswa_kelas_mata_kuliah,
    data_jadwal_kuliah,
    total_mahasiswa_wali,
}) => {
    const [jadwal, setJadwal] = useState(
        data_jadwal_kuliah?.filter(
            (item) => item.tanggal == new Date().toLocaleDateString("en-CA")
        ) || []
    );
    return (
        <AdminLayout title={["Dashboard", "Dosen"]}>
            <div className="grid grid-cols-3 gap-4">
                <CardDashboardDosen
                    title={"Jumlah Kelas Mata Kuliah"}
                    icon={
                        <div className="bg-blue-500 p-4 rounded-md ">
                            <FaUser className="text-white" />
                        </div>
                    }
                    total={total_kelas_mata_kuliah}
                />
                <CardDashboardDosen
                    title={"Jumlah Mahasiswa diajar"}
                    icon={
                        <div className="bg-blue-500 p-4 rounded-md ">
                            <FaUser className="text-white" />
                        </div>
                    }
                    total={total_mahasiswa_kelas_mata_kuliah}
                />{" "}
                <CardDashboardDosen
                    title={"Jumlah Mahasiswa per-Walian"}
                    icon={
                        <div className="bg-blue-500 p-4 rounded-md ">
                            <FaUser className="text-white" />
                        </div>
                    }
                    total={total_mahasiswa_wali}
                />
            </div>
            <div className="flex gap-2 my-4">
                <div className="w-full bg-white p-4 rounded-md border shadow-sm">
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={data_jadwal_kuliah.map((item) => ({
                            start: item.tanggal,
                            display: "background",
                        }))}
                        height={500}
                        eventClick={(info) => {
                            const date =
                                info.event.start.toLocaleDateString("en-CA");

                            const filter = data_jadwal_kuliah.filter(
                                (item) => item.tanggal == date
                            );
                            setJadwal(filter);
                        }}
                    />
                </div>
                <div className="w-full">
                    {jadwal?.map((item) => (
                        <div className="bg-white rounded-md border p-2">
                            <h1>{item.tanggal}</h1>
                            <h1>
                                {
                                    item.kelas_mata_kuliah.mata_kuliah
                                        .nama_mata_kuliah
                                }
                            </h1>
                            <h1>
                                Jam ( {item.kelas_mata_kuliah.jam_mulai}
                                {" - "}
                                {item.kelas_mata_kuliah.jam_selesai})
                            </h1>
                            <h1>
                                Dosen Pengampu :
                                {item.kelas_mata_kuliah.dosen.nama_dosen}
                            </h1>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

const CardDashboardDosen = ({ title, total, icon }) => {
    return (
        <div className="bg-white rounded-md border p-4">
            <h1>{title}</h1>
            <div className="flex justify-between my-4 items-center">
                {icon}
                <h1 className="font-bold text-2xl">{total}</h1>
            </div>
        </div>
    );
};
export default DashboardDosen;
