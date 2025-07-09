import { useState } from "react";
import type { Task, UpdateTask } from "@smarttask/shared";

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, updates: UpdateTask) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const TaskItem = ({ task, onUpdate, onDelete }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");

  const handleToggleComplete = () => {
    onUpdate(task.id, { completed: !task.completed });
  };

  const handleSave = async () => {
    await onUpdate(task.id, { title, description });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description ?? "");
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div id="task-edit">
          <h1>Edit Task</h1>
          <div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-500 rounded-[5px]"
            />
          </div>
          <div>
            <textarea
              className="border border-gray-500 rounded-[5px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="h-10 bg-green-600 w-30 rounded-[5px]  text-white"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="h-10 bg-gray-500 w-30 rounded-[5px]  text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div id="task-view" className="flex justify-items-center">
          <div className="flex flex-col gap-2">
            <div className="font-bold">{task.title}</div>
            <div>{task.description}</div>
            <div>
              <div className="flex gap-2">
                <button
                  onClick={handleToggleComplete}
                  className="h-10 bg-amber-800  w-30 rounded-[5px] text-white"
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="h-10 bg-blue-600 w-30 rounded-[5px]  text-white"
                >
                  Edit
                </button>
                <button
                  className="h-10 bg-red-600 w-30 rounded-[5px] text-white"
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
