import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = (props) => {
  const { reportData } = props;
  const [chartData, setChartData] = useState({
    labels: reportData.map((data) => {
      if (data.completed) {
        return "Completed";
      } else {
        return "Incomplete";
      }
    }),
    datasets: [
      {
        label: "Todo Report",
        data: reportData.map((data) => data.count),
        backgroundColor: ["#334155", "#0F172A"],
      },
    ],
  });
  useEffect(() => {
    setChartData({
      labels: reportData.map((data) => {
        if (data.completed) {
          return "Completed";
        } else {
          return "Incomplete";
        }
      }),
      datasets: [
        {
          label: "Todo Report",
          data: reportData.map((data) => data.count),
          backgroundColor: ["#334155", "#0F172A"],
        },
      ],
    });
  }, [reportData]);
  return <Pie data={chartData} />;
};

export default PieChart;
