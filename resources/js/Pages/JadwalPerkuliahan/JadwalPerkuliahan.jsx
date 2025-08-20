import AdminLayout from "@/Layouts/AdminLayout";
import FullCalendar from "@fullcalendar/react";
import React, { useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import SecondaryButton from "@/Components/SecondaryButton";
import { useModal } from "@/Context/ModalContext";
import AbsenModal from "@/Components/modal/AbsenModal";
import { router } from "@inertiajs/react";
const JadwalPerkuliahan = ({ data_jadwal }) => {
    const [jadwal, setJadwal] = useState(
        data_jadwal.filter(
            (item) => item.tanggal == new Date().toLocaleDateString("en-CA")
        ) || []
    );
    const { showModal, closeModal } = useModal();

    const handleAbsen = (id) => {
        router.post(
            route("absen.store", {
                pertemuan_id: id,
            }),
            {
                onSuccess: () => {
                    closeModal();
                },
            }
        );
        console.log(id);
    };

    return (
        <AdminLayout title={["Jadwal Perkuliahan"]}>
            <div className="flex gap-4">
                <div className="w-full bg-white p-4 rounded-md border shadow-sm">
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={data_jadwal.map((item) => ({
                            start: item.tanggal,
                            display: "background",
                        }))}
                        height={500}
                        eventClick={(info) => {
                            const date =
                                info.event.start.toLocaleDateString("en-CA");

                            setJadwal(
                                data_jadwal.filter(
                                    (item) => item.tanggal == date
                                )
                            );
                        }}
                    />
                </div>
                <div className="flex flex-col gap-4 w-full">
                    {jadwal.map((item) => (
                        <div className="bg-white p-4 rounded-md border shadow-sm">
                            <div className="flex justify-between">
                                <div className="">
                                    <p>
                                        {
                                            item.kelas_mata_kuliah.dosen
                                                .nama_dosen
                                        }
                                    </p>
                                    <p>
                                        {
                                            item.kelas_mata_kuliah.mata_kuliah
                                                .nama_mata_kuliah
                                        }{" "}
                                        ({item.kelas_mata_kuliah.nama_kelas})
                                    </p>
                                    <p>
                                        Jam Perkuliahan (
                                        {item.kelas_mata_kuliah.jam_mulai} -{" "}
                                        {item.kelas_mata_kuliah.jam_selesai})
                                    </p>
                                </div>
                                <div className="">
                                    <p className="font-semibold">
                                        {item.tanggal}
                                    </p>
                                    {item.absensi_detail ? (
                                        <SecondaryButton className="mt-4">
                                            {item?.absensi_detail?.status}
                                        </SecondaryButton>
                                    ) : (
                                        <SecondaryButton
                                            className="mt-4"
                                            onClick={() =>
                                                showModal(
                                                    <AbsenModal
                                                        handleAbsen={() =>
                                                            handleAbsen(item.id)
                                                        }
                                                    />
                                                )
                                            }
                                        >
                                            Absen
                                        </SecondaryButton>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default JadwalPerkuliahan;
