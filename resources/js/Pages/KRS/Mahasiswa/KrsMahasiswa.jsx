import Authenticated from "@/Layouts/AuthenticatedLayout";
import KrsSection from "@/Section/KrsSection";
import RekapanKrsSection from "@/Section/RekapanKrsSection";
import React, { useState } from "react";

const KrsMahasiswa = ({ auth, data_mata_kuliah, data_krs_mahasiswa }) => {
    const [tab, setTab] = useState("krs");
    const tabButtonClass = (activeTab) =>
        `w-full p-2 rounded-md ${
            tab === activeTab ? "bg-violet-500 text-white" : "bg-white"
        }`;
    return (
        <Authenticated user={auth}>
            <div className="flex w-full gap-2 my-4">
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
                <RekapanKrsSection data_krs_mahasiswa={data_krs_mahasiswa} />
            )}
        </Authenticated>
    );
};

export default KrsMahasiswa;
