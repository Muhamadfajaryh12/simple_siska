import TextInputContent from "@/Components/input/TextInputContent";
import useToIDR from "@/hooks/useToIDR";

import React from "react";

const ProfileKuliah = ({ data_mahasiswa }) => {
    return (
        <div className="flex flex-col gap-4">
            <TextInputContent
                disabled
                label={"Fakultas"}
                value={data_mahasiswa.fakultas.nama_fakultas}
            />
            <TextInputContent
                disabled
                label={"Program Studi"}
                value={data_mahasiswa.prodi.nama_prodi}
            />
            <TextInputContent
                disabled
                label={"Angkatan"}
                value={data_mahasiswa.angkatan}
            />
            <TextInputContent
                disabled
                label={"Semester"}
                value={data_mahasiswa.semester}
            />
            <TextInputContent
                disabled
                label={"Golongan UKT"}
                value={
                    `Golongan ${data_mahasiswa.golongan_ukt.golongan} - ` +
                    `${useToIDR(data_mahasiswa.golongan_ukt.nominal)}`
                }
            />
        </div>
    );
};

export default ProfileKuliah;
