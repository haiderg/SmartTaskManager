import { useTasks } from "../../hooks/useTasks";

const LatestTasks = () => {
  const { tasks, loading, error } = useTasks();

  return (
    <div>
      <div className="text-xl font-semibold mb-2">Latest Tasks</div>
      {loading && <p>Loading tasks...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found</p>
      ) : (
        <div className="space-y-2">
          {tasks.slice(0, 5).map((task) => (
            <div
              key={task.id}
              className="p-2 bg-gray-50 rounded text-sm flex justify-between items-center"
            >
              <p className="font-medium truncate flex-1">{task.title}</p>
              <p className="text-xs text-gray-600 ml-2 flex-shrink-0">
                {task.completed ? "✅ Completed" : "⏳ Pending"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestTasks;
