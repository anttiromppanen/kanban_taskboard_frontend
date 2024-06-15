/* eslint-disable no-underscore-dangle */
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import TaskboardFrame from "../../components/TaskboardFrame";
import useAuth from "../../hooks/useAuth";
import getTaskboard from "../../services/taskboardService";
import { ITask, IToken, StatusType } from "../../types/types";

type TasksByStatus = {
  [key in StatusType]: ITask[];
};

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
          <h2 className="text-3xl">{data.name}</h2>
          <div className="mt-4 grid grid-cols-[repeat(4,1fr)] gap-x-4">
            {(["Backlog", "To do", "In progress", "Done"] as StatusType[]).map(
              (status) => (
                <div key={status} className="flex flex-col gap-y-4">
                  <h3 className="">{status}</h3>
                  {tasksByStatus[status].map((x) => (
                    <button
                      key={x._id}
                      type="button"
                      className="w-full rounded-md bg-userGray2 p-3 text-left"
                    >
                      {x.title}
                    </button>
                  ))}
                </div>
              ),
            )}
          </div>
        </>
      )}
    </TaskboardFrame>
  );
}

export default Taskboard;
