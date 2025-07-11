import { useMemo, useState } from "react";
import type { Task, UpdateTask } from "@smarttask/shared";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { EditTaskModal } from "./EditTaskModal";

interface TasksTableProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onUpdate: (id: string, updates: UpdateTask) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const TasksTable = ({
  tasks,
  loading,
  error,
  onUpdate,
  onDelete,
}: TasksTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const columns = useMemo<ColumnDef<Task>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
          <div className="min-w-0">
            <div
              className="font-medium text-gray-900 truncate"
              title={row.original.title ?? ""}
            >
              {row.original.title ?? ""}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "description",
        header: () => <span className="hidden md:inline">Description</span>,
        cell: ({ row }) => {
          const description = row.original.description ?? "";
          const truncatedDescription =
            description.length > 15
              ? description.substring(0, 15) + "..."
              : description;
          return (
            <div
              className="max-w-xs truncate hidden md:block"
              title={row.original.description ?? ""}
            >
              {truncatedDescription}
            </div>
          );
        },
      },
      {
        accessorKey: "completed",
        header: () => <span className="hidden md:inline">Status</span>,
        cell: ({ row }) => (
          <span
            className={`hidden md:inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
              row.original.completed
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {row.original.completed ? "Done" : "Pending"}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-1 flex-nowrap">
            <button
              onClick={() =>
                onUpdate(row.original.id, {
                  completed: !row.original.completed,
                })
              }
              className={`px-2 py-1 rounded text-xs font-medium w-12 ${
                row.original.completed
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {row.original.completed ? "Undo" : "✓"}
            </button>
            <button
              onClick={() => setEditingTask(row.original)}
              className="px-2 py-1 bg-blue-500 text-white rounded text-xs font-medium hover:bg-blue-600 w-12"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(row.original.id)}
              className="px-2 py-1 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600 w-12"
            >
              Del
            </button>
          </div>
        ),
      },
    ],
    [onUpdate, onDelete]
  );

  const table = useReactTable({
    data: tasks,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <EditTaskModal
        isOpen={!!editingTask}
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={onUpdate}
        loading={loading}
      />

      <div className="w-full">
        <div className="overflow-x-auto shadow md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={`px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${
                        header.column.id === "description"
                          ? "hidden md:table-cell"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted()
                          ? header.column.getIsSorted() === "asc"
                            ? " ↑"
                            : " ↓"
                          : ""}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`px-3 sm:px-6 py-4 text-sm text-gray-900 ${
                        cell.column.id === "description"
                          ? "hidden md:table-cell"
                          : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">No tasks found</div>
        )}

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200">
          <div className="flex items-center gap-2 mb-3 sm:mb-0">
            <span className="text-sm text-gray-700">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <span className="text-sm text-gray-500 hidden sm:inline">
              |{table.getFilteredRowModel().rows.length} total
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center gap-1">
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="px-2 py-1 text-xs sm:text-sm border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ««
              </button>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-2 py-1 text-xs sm:text-sm border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ‹
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-2 py-1 text-xs sm:text-sm border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ›
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="px-2 py-1 text-xs sm:text-sm border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                »»
              </button>
            </div>

            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="px-2 py-1 text-xs sm:text-sm border rounded mt-2 sm:mt-0"
            >
              {[5, 10, 20, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
