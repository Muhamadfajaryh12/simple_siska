import React from "react";
import DataTable from "react-data-table-component";

const AbsenDaftarMahasiswaSection = ({ data_pertemuan, total_mahasiswa }) => {
    return (
        <div>
            {" "}
            <div className="grid grid-cols-3 gap-4 my-4">
                <div className="border bg-white rounded-md h-12 flex justify-between items-center p-4">
                    <h1>Total Mahasiswa</h1>
                    <h1>{total_mahasiswa}</h1>
                </div>
                <div className="border bg-white rounded-md h-12 flex justify-between items-center p-4">
                    <h1>Hadir</h1>
                    <h1>{data_pertemuan.total_hadir}</h1>
                </div>
                <div className="border bg-white rounded-md h-12 flex justify-between items-center p-4">
                    <h1>Izin</h1>
                    <h1>{data_pertemuan.total_izin}</h1>
                </div>
            </div>
            <div className="bg-white rounded-md ">
                <h1 className="my-2 font-semibold p-4">Daftar Absensi</h1>

                <DataTable
                    data={data_pertemuan.absensi}
                    columns={[
                        {
                            name: "NIM",
                            selector: (row) => row.mahasiswa.nim,
                        },
                        {
                            name: "Mahasiswa",
                            selector: (row) => row.mahasiswa.nama_mahasiswa,
                        },
                        {
                            name: "Status",
                            selector: (row) => (
                                <p className="uppercase p-2 rounded-md bg-green-500 text-white text-xs">
                                    {row.status}
                                </p>
                            ),
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default AbsenDaftarMahasiswaSection;
