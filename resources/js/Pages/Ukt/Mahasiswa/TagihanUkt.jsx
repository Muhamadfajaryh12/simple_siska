import StatusButton from "@/Components/StatusButton";
import useToIDR from "@/hooks/useToIDR";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

const TagihanUkt = ({ data_tagihan_ukt }) => {
    console.log(data_tagihan_ukt);
    return (
        <AdminLayout title={["Pembayaran", "UKT"]}>
            {data_tagihan_ukt.map((item) => (
                <div className="rounded-md bg-white border p-4">
                    <div className="flex justify-between items-center">
                        <div className="">
                            <h1>{item.mahasiswa.nama_mahasiswa}</h1>
                            <h1 className="capitalize">
                                {item.mahasiswa.prodi.nama_prodi}
                            </h1>
                            <h1>
                                Nominal Pembayaran :{" "}
                                {useToIDR(item.mahasiswa.golongan_ukt.nominal)}
                            </h1>{" "}
                            <h1 className="capitalize">
                                {" "}
                                Tahun Ajaran :{" "}
                                {item.semester_ajaran.semester_ajaran}
                            </h1>
                        </div>
                        <div className="flex flex-col gap-4">
                            <button className="bg-blue-500 p-2 hover:bg-blue-600  text-white rounded-md text-xs uppercase">
                                Generate VA
                            </button>
                            <StatusButton>{item.status}</StatusButton>
                        </div>
                    </div>
                </div>
            ))}
        </AdminLayout>
    );
};

export default TagihanUkt;
