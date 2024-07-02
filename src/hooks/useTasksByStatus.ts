import { useMemo } from "react";
import { ITask, TasksByStatus } from "../types/types";

const useTasksByStatus = (tasks: ITask[] | null) => {
  const tasksByStatus = useMemo(() => {
    if (!tasks)
      return {
        Backlog: [],
        "To do": [],
        "In progress": [],
        Done: [],
      } as TasksByStatus;

    return tasks.reduce(
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
  }, [tasks]);

  return tasksByStatus;
};

export default useTasksByStatus;
