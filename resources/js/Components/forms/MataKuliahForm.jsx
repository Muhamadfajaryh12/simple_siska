import { useForm } from "@inertiajs/react";
import React from "react";

const MataKuliahForm = ({
    data_fakultas,
    data_prodi,
    data_dosen,
    data_kelas,
}) => {
    const { data, setData, processing, post, errors, reset } = useForm();
    return <div>MataKuliahForm</div>;
};

export default MataKuliahForm;
