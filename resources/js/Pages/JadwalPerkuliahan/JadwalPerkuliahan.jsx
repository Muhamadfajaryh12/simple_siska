import AdminLayout from "@/Layouts/AdminLayout";
import FullCalendar from "@fullcalendar/react";
import React, { useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
const JadwalPerkuliahan = ({ data_jadwal }) => {
    const [jadwal, setJadwal] = useState([]);
    return (
        <AdminLayout title={["Jadwal Perkuliahan"]}>
            <div className="flex gap-2">
                <div className="w-full bg-white p-4 rounded-md border">
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={data_jadwal[0]?.kelas_mata_kuliah?.pertemuan.map(
                            (item) => ({
                                start: item.tanggal,
                                display: "background",
                            })
                        )}
                        height={500}
                        eventClick={(info) => {
                            const date =
                                info.event.start.toLocaleDateString("en-CA");

                            setJadwal(
                                data_jadwal[0].kelas_mata_kuliah?.pertemuan.filter(
                                    (item) => item.tanggal == date
                                )
                            );
                            console.log(jadwal);
                        }}
                    />
                </div>
                <div className="flex flex-col gap-4 w-full">
                    {jadwal.map((item) => (
                        <div className="bg-white p-2 rounded-md border">
                            {item.tanggal}
                        </div>
                    ))}
                </div>{" "}
            </div>
        </AdminLayout>
    );
};

export default JadwalPerkuliahan;
