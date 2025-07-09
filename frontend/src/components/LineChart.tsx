// LineChart.tsx
import { Line } from "react-chartjs-2";
import type { Task } from "@smarttask/shared";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions, ChartData } from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
  },
};

interface Props {
  tasks?: Task[];
}

export default function LineChart({ tasks = [] }: Props) {
  // Group tasks by date and status
  const tasksByDate = tasks.reduce((acc, task) => {
    const date = new Date(
      task.updatedAt || task.createdAt
    ).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = { completed: 0, pending: 0 };
    }
    if (task.completed) {
      acc[date].completed++;
    } else {
      acc[date].pending++;
    }
    return acc;
  }, {} as Record<string, { completed: number; pending: number }>);

  const dates = Object.keys(tasksByDate).sort();
  const completedData = dates.map((date) => tasksByDate[date].completed);
  const pendingData = dates.map((date) => tasksByDate[date].pending);

  const data: ChartData<"line"> = {
    labels: dates,
    datasets: [
      {
        label: "Completed Tasks",
        data: completedData,
        borderColor: "rgba(34,197,94,1)",
        backgroundColor: "rgba(34,197,94,0.2)",
        tension: 0.3,
      },
      {
        label: "Pending Tasks",
        data: pendingData,
        borderColor: "rgba(239,68,68,1)",
        backgroundColor: "rgba(239,68,68,0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="w-[95%] h-full overflow-hidden">
      <Line data={data} options={options} />
    </div>
  );
}
