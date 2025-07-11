import TaskStatusCount from "../components/TaskStatusCount";
import { ALERT_TYPES } from "../utils/constants";
import LatestIssues from "../components/Tasks/LatestTasks";
import LineChart from "../components/LineChart";
import { useTasks } from "../hooks/useTasks";

const Dashboard = () => {
  const { tasks } = useTasks();

  const completedTasks = tasks.filter((task) => task.completed === true).length;
  const pendingTasks = tasks.filter((task) => task.completed === false).length;
  const totalTasks = tasks.length;

  return (
    <>
      <div
        id="dashboard"
        className="flex flex-col lg:flex-row gap-4 m-2 h-[calc(100vh-80px)]"
      >
        <div
          id="main-contents"
          className="w-full lg:w-4/5 flex flex-col border-2 border-gray-400 p-10 rounded-[10px]"
        >
          <div
            id="task-status"
            className="flex flex-col sm:flex-row justify-around gap-4 p-4"
          >
            <TaskStatusCount
              title="Closed"
              count={completedTasks}
              type={ALERT_TYPES.SUCCESS}
            />
            <TaskStatusCount
              title="In Progress"
              count={pendingTasks}
              type={ALERT_TYPES.WARNING}
            />
            <TaskStatusCount
              title="Open"
              count={totalTasks}
              type={ALERT_TYPES.DANGER}
            />
          </div>
          <div id="tasks-stats">
            <LineChart tasks={tasks} />
          </div>
        </div>
        <div
          id="latest-issues"
          className="border-2 border-gray-400 p-10 rounded-[10px]"
        >
          <LatestIssues />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
