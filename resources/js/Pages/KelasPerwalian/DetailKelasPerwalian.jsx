import StatusButton from "@/Components/StatusButton";
import SubText from "@/Components/SubText";
import AdminLayout from "@/Layouts/AdminLayout";
import React, { useState } from "react";
import TableMahasiswaKRS from "./partials/TableMahasiswaKRS";
import TableMahasiswa from "./partials/TableMahasiswa";
import TableMahasiswaUkt from "./partials/TableMahasiswaUkt";

const DetailKelasPerwalian = ({
    data_mahasiswa,
    data_detail,
    data_krs,
    data_ukt,
}) => {
    const [active, setActive] = useState("umum");
    return (
        <AdminLayout title={["Kelas Perwalian", ""]}>
            <div className="grid grid-cols-3 mb-4 gap-4">
                <div className="bg-white rounded-md p-4">
                    <SubText text={"Total Mahasiswa"} />
                    <h1 className="font-bold text-2xl">
                        {data_detail.mahasiswa_count}
                    </h1>
                </div>
                <div className="bg-white rounded-md p-4">
                    <SubText text={"Dosen Wali"} />
                    <h1 className="font-bold text-2xl">
                        {data_detail.dosen.nama_dosen}
                    </h1>
                </div>
                <div className="bg-white rounded-md p-4">
                    <SubText text={"Angkatan"} />
                    <h1 className="font-bold text-2xl">
                        {data_detail.angkatan}
                    </h1>
                </div>
            </div>
            <div className="flex gap-2 my-4">
                <button
                    className={`p-2 rounded-md w-24  ${
                        active === "umum"
                            ? "bg-green-600 text-white"
                            : "bg-white"
                    }`}
                    onClick={() => setActive("umum")}
                >
                    Umum
                </button>
                <button
                    className={`p-2 rounded-md w-24  ${
                        active === "krs"
                            ? "bg-green-600 text-white"
                            : "bg-white"
                    }`}
                    onClick={() => setActive("krs")}
                >
                    KRS
                </button>
                <button
                    className={`p-2 rounded-md w-24  ${
                        active === "ukt"
                            ? "bg-green-600 text-white"
                            : "bg-white"
                    }`}
                    onClick={() => setActive("ukt")}
                >
                    UKT
                </button>
            </div>
            <div className="bg-white rounded-md p-4">
                <SubText text={"Daftar Mahasiswa"} />
                {active === "umum" && (
                    <TableMahasiswa data_mahasiswa={data_mahasiswa} />
                )}

                {active === "krs" && <TableMahasiswaKRS data_krs={data_krs} />}

                {active === "ukt" && <TableMahasiswaUkt data_ukt={data_ukt} />}
            </div>
        </AdminLayout>
    );
};

export default DetailKelasPerwalian;
