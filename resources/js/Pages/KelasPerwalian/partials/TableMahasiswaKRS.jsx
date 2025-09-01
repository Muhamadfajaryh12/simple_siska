import StatusButton from "@/Components/StatusButton";
import React from "react";

const TableMahasiswaKRS = ({ data_krs }) => {
    const semesters = Math.max(
        ...Object.values(data_krs)
            .flat()
            .map((item) => item.semester)
    );
    return (
        <table className="w-full text-sm border-collapse">
            <thead>
                <tr>
                    <th className="border border-black p-2 uppercase">
                        Mahasiswa
                    </th>
                    {Array.from({ length: semesters }, (_, i) => (
                        <th
                            key={i}
                            className="border border-black p-2 uppercase"
                        >
                            Semester {i + 1}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Object.keys(data_krs).map((nama) => {
                    const semesterMap = {};
                    data_krs[nama].forEach((d) => {
                        semesterMap[d.semester] = d.status;
                    });

                    return (
                        <tr key={nama}>
                            <td className="border border-black p-2">{nama}</td>
                            {Array.from({ length: semesters }, (_, i) => (
                                <td
                                    key={i}
                                    className="border border-black p-2 text-center"
                                >
                                    {semesterMap[i + 1] ? (
                                        <StatusButton>
                                            {semesterMap[i + 1]}
                                        </StatusButton>
                                    ) : (
                                        "-"
                                    )}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableMahasiswaKRS;
