import BarContainer from "@/Components/BarContainer";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

const DashboardMahasiswa = ({ auth, data_krs }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const data_semester = data_krs.map((item) => ({
            nilai: item.nilai_huruf,
            semester: item.mata_kuliah.semester,
            sks: item.mata_kuliah.sks,
        }));
        const groupedBySemester = data_semester.reduce((acc, item) => {
            if (!acc[item.semester]) {
                acc[item.semester] = [];
            }
            acc[item.semester].push(item);
            return acc;
        }, {});

        const semesterIPK = Object.keys(groupedBySemester).map((semester) => {
            const semesterData = groupedBySemester[semester];
            const totalSKS = semesterData.reduce(
                (acc, item) => acc + item.sks,
                0
            );
            const totalNilai = semesterData.reduce((acc, item) => {
                let index = 0;
                if (item.nilai === "A") {
                    index = 4;
                } else if (item.nilai === "B") {
                    index = 3;
                } else if (item.nilai === "C") {
                    index = 2;
                } else if (item.nilai === "D") {
                    index = 1;
                } else {
                    index = 0;
                }
                return acc + index * item.sks;
            }, 0);

            const ipk = totalSKS > 0 ? (totalNilai / totalSKS).toFixed(2) : 0;

            return {
                semester: "Semester " + parseInt(semester),
                ipk,
            };
        });
        setData(semesterIPK);
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h6>
                                Welcome{" "}
                                <span className="font-bold text-lg">
                                    {auth.user.nama} !
                                </span>
                            </h6>
                            <div className="h-96 flex justify-center">
                                <BarContainer
                                    datas={data}
                                    labelKey={"semester"}
                                    dataKey={"ipk"}
                                    chartTitle={"Grafik Index Prestasi"}
                                    backgroundColor={["rgba(54,162,132,0.6)"]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default DashboardMahasiswa;
