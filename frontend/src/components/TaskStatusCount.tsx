import { type AlertType } from "../utils/constants";

interface Props {
  title: string;
  count: number;
  type: AlertType;
}

const TaskStatusCount = ({ title, count, type }: Props) => {
  return (
    <>
      <div
        className={`p-4 sm:p-6 lg:p-8 min-h-[120px] w-full sm:w-auto flex-1 rounded-2xl border-2 flex flex-col justify-center items-center ${type}`}
      >
        <span className="text-3xl font-bold">{count}</span>
        <p>{title}</p>
      </div>
    </>
  );
};

export default TaskStatusCount;
