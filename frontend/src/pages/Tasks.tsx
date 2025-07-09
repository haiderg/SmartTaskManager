import { TasksTable, SaveTaskModal } from "../components/Tasks";
import { useState } from "react";
import { useTasks } from "../hooks/useTasks";

export const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks, createTask, updateTask, deleteTask, loading, error } =
    useTasks();

  return (
    <>
      <div className="max-w-[700px] mx-auto mt-2 p-[5px] min-h-[calc(100vh-70px)] border-gray-200 border-2 rounded-lg">
        <button
          onClick={() => setIsModalOpen(true)}
          className="h-10 bg-green-600 px-4 rounded-[5px] text-white mb-4"
        >
          Create New Task
        </button>

        <SaveTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={async ({ title, description }) => {
            await createTask({ title, description });
          }}
          loading={loading}
        />

        <TasksTable
          tasks={tasks}
          loading={loading}
          error={error}
          onUpdate={async (id, { title, description }) => {
            await updateTask(id, { title, description });
          }}
          onDelete={deleteTask}
        />
      </div>
    </>
  );
};
