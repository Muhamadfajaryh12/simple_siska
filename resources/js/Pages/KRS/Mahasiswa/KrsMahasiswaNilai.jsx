import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef } from "react";
import "jspdf-autotable";
const NilaiMahasiswa = ({ data_krs, auth }) => {
    console.log(auth);
    const content = useRef();
    const totalSKS = data_krs.reduce(
        (acc, item) => acc + item.mata_kuliah.sks,
        0
    );
    const downloadPDF = () => {
        const doc = new jsPDF();

        // Menambahkan teks ke PDF
        doc.setFontSize(18); // Mengatur ukuran font
        doc.text("Kartu Rencana Studi (KRS)", 14, 10); // Menambahkan judul
        doc.setFontSize(12); // Ukuran font lebih kecil untuk teks tambahan
        doc.text(`Nama:${auth.user.nama} `, 14, 20); // Menambahkan nama (contoh)
        doc.text(`NIM: ${auth.user.nomor_induk}`, 14, 26); // Menambahkan NIM (contoh)

        // Menambahkan spasi sebelum tabel
        doc.text(" ", 14, 38);

        // Siapkan data tabel
        const tableColumn = ["Mata Kuliah", "Jumlah SKS", "Nilai"];
        const tableRows = [];

        data_krs.forEach((item) => {
            const rowData = [
                item.mata_kuliah.nama_mata_kuliah,
                item.mata_kuliah.sks,
                item.nilai_huruf,
            ];
            tableRows.push(rowData);
        });

        // Menambahkan tabel ke dalam PDF
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 40, // Posisi di mana tabel akan dimulai di halaman,
            styles: {
                fillColor: [255, 255, 255], // Warna putih untuk background (tidak ada warna)
                textColor: 0, // Warna teks hitam
                lineColor: 0, // Warna garis hitam
            },
            headStyles: {
                fillColor: [255, 255, 255], // Warna putih untuk background header
                textColor: 0, // Warna teks header hitam
                lineWidth: 0.1, // Tebal garis header
            },
            bodyStyles: {
                fillColor: [255, 255, 255], // Warna putih untuk background body tabel
                textColor: 0, // Warna teks hitam
                lineWidth: 0.1, // Tebal garis body tabel
            },
        });
        // Ambil posisi akhir tabel
        const finalY = doc.autoTable.previous.finalY;

        // Menambahkan teks setelah tabel
        doc.setFontSize(12);
        doc.text(`Total SKS: ${totalSKS}`, 14, finalY + 10); // 10 mm di bawah tabel
        doc.text(`Total Indeks: ${totalIndexKumulatif}`, 14, finalY + 16); // 6 mm setelah Total SKS
        doc.text(
            `Total Indeks Prestasi: ${totalIndexPrestasi}`,
            14,
            finalY + 22
        ); // 6 mm setelah Total Indeks

        // Menambahkan tanda tangan
        doc.text(`Disetujui Oleh`, 120, finalY + 40); // Posisi tanda tangan lebih jauh dari tabel
        doc.addImage("/signature.png", 100, finalY + 40, 80, 30); // Menambahkan gambar di posisi (x=150, y=10) dengan ukuran (40x15 mm)
        doc.text(`Koordinator Program Studi`, 120, finalY + 70); // Posisi Koordinator lebih jauh dari Disetujui Oleh

        // Menyimpan file PDF
        doc.save("KRS.pdf");
    };

    const totalIndexKumulatif = data_krs.reduce((acc, item) => {
        let index = 0;

        if (item.nilai_huruf === "A") {
            index = 4;
        } else if (item.nilai_huruf === "B") {
            index = 3;
        } else if (item.nilai_huruf === "C") {
            index = 2;
        } else if (item.nilai_huruf === "D") {
            index = 1;
        } else {
            index = 0;
        }

        return acc + index * item.mata_kuliah.sks;
    }, 0);

    const totalIndexPrestasi = (totalIndexKumulatif / totalSKS).toFixed(2);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Kartu Rencana Studi
                </h2>
            }
        >
            <Head title="Kartu Rencana Studi" />{" "}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className=" text-gray-900 my-2">
                            <p className="text-lg">Nilai Kartu Rencana Studi</p>
                            <span className="text-sm font-bold">
                                Berikut merupakan keseluruhan nilai anda
                            </span>
                        </div>
                        <PrimaryButton
                            className="my-2"
                            type="button"
                            onClick={downloadPDF}
                        >
                            Unduh KRS
                        </PrimaryButton>
                        <table
                            className="border-collapse border border-slate-400 w-full "
                            ref={content}
                        >
                            <thead>
                                <tr>
                                    <th className="border border-black p-2">
                                        Mata Kuliah
                                    </th>
                                    <th className="border border-black p-2">
                                        Jumlah SKS
                                    </th>
                                    <th className="border border-black p-2">
                                        Nilai
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data_krs.map((item) => (
                                    <tr>
                                        <td className="border border-black">
                                            <p className="ml-2">
                                                {
                                                    item.mata_kuliah
                                                        .nama_mata_kuliah
                                                }
                                            </p>
                                        </td>
                                        <td className="border border-black text-center">
                                            {item.mata_kuliah.sks}
                                        </td>
                                        <td className="border border-black text-center">
                                            {item.nilai_huruf}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="my-4">
                            <div className="grid grid-cols-10 font-bold">
                                <h6>Total SKS</h6>
                                <h6>: {totalSKS}</h6>
                            </div>
                            <div className="grid grid-cols-10 font-bold">
                                <h6>Index Kumulatif</h6>
                                <h6>: {totalIndexKumulatif}</h6>
                            </div>
                            <div className="grid grid-cols-10 font-bold">
                                <h6>Index Prestasi</h6>
                                <h6>: {totalIndexPrestasi}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default NilaiMahasiswa;
