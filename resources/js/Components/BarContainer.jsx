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

const BarContainer = ({
    datas,
    labelKey,
    dataKey,
    chartTitle,
    backgroundColor,
    chartBackgroundColor,
}) => {
    const data = {
        labels: datas.map((item) => item[labelKey]),
        datasets: [
            {
                label: "Jumlah Dosen",
                data: datas.map((item) => item[dataKey]),
                backgroundColor: datas.map(
                    (_, index) =>
                        backgroundColor[index % backgroundColor.length]
                ),
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
                display: false,
            },
            title: {
                display: true,
                text: chartTitle,
            },
            beforeDraw: (chart) => {
                const ctx = chart.ctx;
                ctx.save();
                ctx.globalCompositeOperation = "destination-over";
                ctx.fillStyle = chartBackgroundColor;
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
            },
        },
    };
    return <Bar data={data} options={options} />;
};

export default BarContainer;
