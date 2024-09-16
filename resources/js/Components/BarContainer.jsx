import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarContainer = ({ datas }) => {
    console.log(datas);
    const data = {
        labels: datas.map((item) => "Semester" + " " + item.semester),
        datasets: [
            {
                label: "Nilai",
                data: datas.map((item) => item.ipk),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Index Kumulatif Grafik",
            },
        },
    };
    return <Bar data={data} options={options} />;
};

export default BarContainer;
