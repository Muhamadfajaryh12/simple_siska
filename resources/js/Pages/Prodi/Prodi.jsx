import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "@inertiajs/react";
import Modal from "@/Components/Modal";
const Prodi = ({ data }) => {
    const [showModal, setShowModal] = useState(false);
    let index = 0;

    const columns = [
        {
            name: "No",
            selector: (row) => ++index,
        },
        {
            name: "Prodi",
            selector: (row) => row.nama_prodi,
        },
        {
            name: "Kode Prodi",
            selector: (row) => row.kode_prodi,
        },
        {
            name: "Fakultas",
            selector: (row) => row.fakultas.nama_fakultas,
        },
        {
            name: "Action",
            selector: (row) => (
                <div>
                    <button className="bg-blue-400 p-2 rounded-md text-white font-bold mx-1">
                        <Link href={`/fakultas_update/${row.id}`}>Update</Link>
                    </button>
                    <button
                        className="bg-red-400 p-2 rounded-md text-white font-bold mx-1"
                        onClick={() => setShowModal(true)}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <AdminLayout title="Master Prodi">
                <div className="">
                    <Modal show={showModal} onClose={() => setShowModal(false)}>
                        <form action="" className="m-2">
                            <h2 className="text-lg font-medium text-gray-900">
                                Are you sure you want to delete your account?
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Once your account is deleted, all of its
                                resources and data will be permanently deleted.
                                Please enter your password to confirm you would
                                like to permanently delete your account.
                            </p>
                        </form>
                    </Modal>
                    <DataTable
                        columns={columns}
                        data={data}
                        fixedHeader
                        pagination
                    />
                </div>
            </AdminLayout>
        </>
    );
};

export default Prodi;
