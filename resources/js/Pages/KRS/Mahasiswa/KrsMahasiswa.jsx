import AdminLayout from "@/Layouts/AdminLayout";
import KrsSection from "@/Section/KrsSection";
import RekapanKrsSection from "@/Section/RekapanKrsSection";
import React, { useState } from "react";

const KrsMahasiswa = ({
    auth,
    data_mata_kuliah,
    data_krs_mahasiswa,
    data_total_sks,
}) => {
    const [tab, setTab] = useState("krs");
    const tabButtonClass = (activeTab) =>
        `w-full p-2 rounded-md ${
            tab === activeTab ? "bg-green-600 text-white" : "bg-white shadow-md"
        }`;
    return (
        <AdminLayout user={auth} title={["Kartu Rencana Studi"]}>
            <div className="flex w-full gap-2 mb-4">
                <button
                    className={tabButtonClass("krs")}
                    onClick={() => setTab("krs")}
                >
                    Kartu Rencana Studi
                </button>
                <button
                    className={tabButtonClass("rekapan")}
                    onClick={() => setTab("rekapan")}
                >
                    Rekapan Kartu Rencana Studi
                </button>
            </div>
            {tab == "krs" ? (
                <KrsSection data_mata_kuliah={data_mata_kuliah} />
            ) : (
                <RekapanKrsSection
                    data_krs_mahasiswa={data_krs_mahasiswa}
                    data_total_sks={data_total_sks}
                />
            )}
        </AdminLayout>
    );
};

export default KrsMahasiswa;
