import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChartComponent = ({ chartData, title }) => {
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    font: {
                        size: 10, // 👈 atur ukuran font legend di sini
                    },
                },
            },
            title: {
                display: !!title,
                text: title,
                position: "bottom",
            },
        },
    };

    return <Doughnut data={chartData} options={chartOptions} />;
};

export default DoughnutChartComponent;
