import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import OverlayForm from "../../components/OverlayForm";
import TaskboardFrame from "../../components/TaskboardFrame";
import useAuth from "../../hooks/useAuth";
import useTasksByStatus from "../../hooks/useTasksByStatus";
import { getTaskboard } from "../../services/taskboardService";
import { ITask, IToken, StatusType } from "../../types/types";
import TaskStatusColumn from "./TaskStatusColumn";
import NewTaskForm from "./NewTaskForm";

function Taskboard() {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const { token } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Taskboard", id],
    queryFn: () => getTaskboard(id as string, token as IToken),
  });

  const tasksByStatus = useTasksByStatus(data?.tasks as ITask[]);

  return (
    <TaskboardFrame>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading taskboard</p>}
      {!isError && !isLoading && (
        <>
          {isOpen && (
            <OverlayForm formHeading="Add new task" setIsOpen={setIsOpen}>
              <NewTaskForm />
            </OverlayForm>
          )}
          <div className="flex items-center justify-between">
            <h2 className="max-w-5xl break-words text-3xl">{data.name}</h2>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-x-2 rounded-md bg-green-600 px-2 py-1 text-white hover:brightness-110"
            >
              <PencilSquareIcon className="size-4" /> New task
            </button>
          </div>
          <div className="mt-4 grid grid-cols-[repeat(4,1fr)] gap-x-4">
            {(["Backlog", "To do", "In progress", "Done"] as StatusType[]).map(
              (status) => (
                <TaskStatusColumn
                  key={status}
                  status={status}
                  tasksByStatus={tasksByStatus}
                />
              ),
            )}
          </div>
        </>
      )}
    </TaskboardFrame>
  );
}

export default Taskboard;
