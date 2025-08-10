import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

const KRSLayout = ({ auth, children }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Kartu Rencana Studi
                </h2>
            }
        >
            <Head title="Kartu Rencana Studi" />
            <div className="flex gap-4 w-full">
                <div className="bg-white p-4 w-48 rounded-md">
                    <ul>
                        <li className="text-sm my-2">
                            <Link href="/krs">Ambil KRS</Link>
                        </li>
                        <li className="text-sm my-2">
                            <Link href={`/krs/history`}>Riwayat KRS</Link>
                        </li>
                    </ul>
                </div>
                <div className="bg-white w-full overflow-hidden shadow-sm sm:rounded-lg ">
                    {children}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default KRSLayout;
