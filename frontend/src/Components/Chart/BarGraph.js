import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const BarGraph = ({labels, values}) => {
    const data = {
        labels: labels.map((label) => {
            return label
        }),
        datasets: [
        {
            label: "",
            data: Object.values(values).map((val) => {
                return val
            }),
            backgroundColor: 'rgba(65, 90, 119, 0.8)',
            borderColor: 'rgba(65, 90, 119, 1)',
            borderWidth: 1,
        },
        ],
    };

    const options = {
        plugins: {
            legend: {
              display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 100,
                },
                title: {
                    display: false
                },
            },
        },
    };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraph;
