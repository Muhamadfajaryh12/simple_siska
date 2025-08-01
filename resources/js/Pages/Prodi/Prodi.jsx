import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import DataTable from "react-data-table-component";
import { Link } from "@inertiajs/react";
import { useModal } from "@/Context/ModalContext";
import DeleteModal from "@/Components/modal/DeleteModal";
import { FaPencil, FaTrash } from "react-icons/fa6";
const Prodi = ({ data }) => {
    const { showModal } = useModal();
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
                        <Link href={`/prodi/form/${row.id}`}>
                            <FaPencil size={15} />
                        </Link>
                    </button>
                    <button
                        className="bg-red-400 p-2 rounded-md text-white font-bold mx-1"
                        onClick={() => showModal(<DeleteModal />)}
                    >
                        <FaTrash size={15} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <AdminLayout title={["Program Studi", "Daftar"]}>
                <div className=" text-gray-900">
                    <p className="text-lg">Daftar Program Studi</p>
                    <span className="text-sm font-bold">
                        Daftar Program Studi yang tersedia
                    </span>
                </div>
                <div className="flex justify-end">
                    <Link href={route("prodi.create")}>
                        <button className="bg-black text-white p-2 rounded-md text-sm font-bold mx-1">
                            Menambah Program Studi
                        </button>
                    </Link>
                </div>

                <DataTable
                    columns={columns}
                    data={data}
                    fixedHeader
                    pagination
                />
            </AdminLayout>
        </>
    );
};

export default Prodi;
