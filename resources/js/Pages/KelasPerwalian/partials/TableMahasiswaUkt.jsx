import StatusButton from "@/Components/StatusButton";
import React from "react";

const TableMahasiswaUkt = ({ data_ukt }) => {
    const allSemesters = Array.from(
        new Set(
            Object.values(data_ukt)
                .flat()
                .map((d) => d.semester_ajaran)
        )
    );

    return (
        <table className="w-full text-sm border-collapse">
            <thead>
                <tr>
                    <th className="border border-black p-2 uppercase">
                        Mahasiswa
                    </th>
                    {allSemesters.map((item) => (
                        <th
                            key={item}
                            className="border border-black p-2 uppercase"
                        >
                            {item}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Object.keys(data_ukt).map((nama) => {
                    const semesterMap = {};
                    data_ukt[nama].forEach((d) => {
                        semesterMap[d.semester_ajaran] = d.status;
                    });

                    return (
                        <tr key={nama}>
                            <td className="border border-black p-2">{nama}</td>
                            {allSemesters.map((s) => (
                                <td
                                    key={s}
                                    className="border border-black p-2 text-center"
                                >
                                    {semesterMap[s] ? (
                                        <StatusButton>
                                            {semesterMap[s]}
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

export default TableMahasiswaUkt;
