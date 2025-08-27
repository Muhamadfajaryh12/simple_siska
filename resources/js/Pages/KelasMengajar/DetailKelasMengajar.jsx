import SecondaryButton from "@/Components/SecondaryButton";
import AdminLayout from "@/Layouts/AdminLayout";
import PertemuanDosenSection from "@/Section/PertemuanDosenSection";
import RekapNilaiSection from "@/Section/RekapNilaiSection";
import React, { useState } from "react";

const DetailKelasMengajar = ({ data_kelas, data_rekap }) => {
    const [dataPertemuan, setDataPertemuan] = useState(
        data_kelas.pertemuan[0] || []
    );
    const [active, setActive] = useState(data_kelas.pertemuan[0].id || false);

    const handleClick = (id) => {
        setDataPertemuan(data_kelas.pertemuan.find((item) => item.id == id));
        setActive(id);
    };

    return (
        <AdminLayout
            title={[
                "Kelas",
                `${data_kelas.nama_kelas}`,
                `${data_kelas.mata_kuliah.nama_mata_kuliah}`,
                `Tahun Ajaran ${data_kelas.tahun_ajaran}`,
            ]}
        >
            <div className="bg-white p-4 rounded-md border">
                <h1 className="mb-4 font-semibold">Pertemuan</h1>
                <div className="flex">
                    {data_kelas.pertemuan.map((item) => (
                        <button
                            className={`flex-1 text-center  p-1 border rounded-md ${
                                item.id == active
                                    ? "bg-violet-500 text-white"
                                    : ""
                            }`}
                            onClick={() => handleClick(item.id)}
                        >
                            {item.pertemuan_ke}
                        </button>
                    ))}
                    <button
                        className="flex-1 text-center  p-1 border rounded-md"
                        onClick={() => handleClick("rekap")}
                    >
                        Rekap
                    </button>
                </div>
            </div>
            {active == "rekap" ? (
                <RekapNilaiSection data_rekap={data_rekap} />
            ) : (
                <PertemuanDosenSection
                    data_pertemuan={dataPertemuan}
                    total_mahasiswa={data_kelas.total_mahasiswa}
                />
            )}
        </AdminLayout>
    );
};

export default DetailKelasMengajar;
