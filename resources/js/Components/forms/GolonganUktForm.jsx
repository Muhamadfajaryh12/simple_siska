import React, { useState } from "react";
import TextInputContent from "../input/TextInputContent";
import SelectContent from "../input/SelectContent";
import PrimaryButton from "../PrimaryButton";
import { router } from "@inertiajs/react";
import SubText from "../SubText";

const golonganData = [
    {
        id: 1,
    },
    {
        id: 2,
    },
    {
        id: 3,
    },
    {
        id: 4,
    },
    {
        id: 5,
    },
    {
        id: 6,
    },
    {
        id: 7,
    },
    {
        id: 8,
    },
];
const GolonganUktForm = ({ data_prodi }) => {
    const [prodiId, setProdiId] = useState();
    const [golongan, setGolongan] = useState(0);
    const [temp, setTemp] = useState([]);

    const handleCreateTemp = () => {
        let arrayTemp = [];
        for (let i = 1; i <= golongan; i++) {
            arrayTemp.push({
                prodi_id: prodiId,
                prodi_nama: data_prodi.find((item) => item.id == prodiId)
                    ?.nama_prodi,
                golongan: i,
                nominal: 0,
            });
        }

        setTemp(arrayTemp);
    };

    const handleChangeNominal = (index, value) => {
        const newTemp = [...temp];
        newTemp[index].nominal = value;
        setTemp(newTemp);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("golongan_ukt.store", { data: temp }));
    };
    return (
        <>
            <div className="bg-white rounded-md p-4 border">
                <SubText text={"Formulir Golongan UKT"} />
                <div className="flex flex-col gap-4">
                    <SelectContent
                        label={"Program Studi"}
                        labelField={"nama_prodi"}
                        valueField={"id"}
                        value={prodiId}
                        name={"prodi_id"}
                        data={data_prodi}
                        handleChange={(e) => setProdiId(e.target.value)}
                    />
                    <SelectContent
                        label={"Sampai Golongan ke"}
                        labelField={"id"}
                        valueField={"id"}
                        value={golongan}
                        name={"golongan"}
                        data={golonganData}
                        handleChange={(e) => setGolongan(e.target.value)}
                    />
                    <PrimaryButton onClick={handleCreateTemp}>
                        Buat
                    </PrimaryButton>
                </div>
            </div>
            <div className="mt-2 bg-white rounded-md p-4 border">
                <SubText text={"Data yang akan disimpan"} />
                {temp.map((item, index) => (
                    <div className="my-4 grid grid-cols-3 gap-4">
                        <TextInputContent
                            value={item.prodi_nama}
                            label={"Program Studi"}
                            readOnly
                        />
                        <TextInputContent
                            value={item.golongan}
                            type={"text"}
                            label={"Golongan ke "}
                            readOnly
                        />
                        <TextInputContent
                            name={"nominal"}
                            type={"number"}
                            label={"Nominal"}
                            onChange={(e) =>
                                handleChangeNominal(index, e.target.value)
                            }
                        />
                    </div>
                ))}
                <PrimaryButton className="w-full " onClick={handleSubmit}>
                    Simpan
                </PrimaryButton>
            </div>
        </>
    );
};

export default GolonganUktForm;
