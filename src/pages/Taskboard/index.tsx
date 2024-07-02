import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import TaskboardFrame from "../../components/TaskboardFrame";
import useAuth from "../../hooks/useAuth";
import { getTaskboard } from "../../services/taskboardService";
import { ITask, IToken, StatusType, TasksByStatus } from "../../types/types";
import TaskStatusColumn from "./TaskStatusColumn";

function Taskboard() {
  const { id } = useParams();
  const { token } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Taskboard", id],
    queryFn: () => getTaskboard(id as string, token as IToken),
  });

  // Using reduce to map tasks by status
  const tasksByStatus: Record<StatusType, ITask[]> =
    data &&
    data.tasks.reduce(
      (acc: TasksByStatus, task: ITask) => {
        acc[task.status].push(task);
        return acc;
      },
      {
        Backlog: [],
        "To do": [],
        "In progress": [],
        Done: [],
      } as TasksByStatus,
    );

  return (
    <TaskboardFrame>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading taskboard</p>}
      {!isError && !isLoading && (
        <>
          <h2 className="max-w-5xl break-words text-3xl">{data.name}</h2>
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
