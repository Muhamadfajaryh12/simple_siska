import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";
import React from "react";

const Fakultas = () => {
    const FakultasLayout = () => {
        const { data } = usePage().props;

        console.log({ data });
        return <></>;
    };
    return (
        <>
            <AdminLayout component={FakultasLayout()} title="Master Fakultas" />
            ;
        </>
    );
};

export default Fakultas;
