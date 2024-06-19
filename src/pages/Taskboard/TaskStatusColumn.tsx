/* eslint-disable no-underscore-dangle */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import useAuth from "../../hooks/useAuth";
import { ITask, IToken, StatusType, TasksByStatus } from "../../types/types";
import { updateTask } from "../../services/taskboardService";
import { statusColors } from "../../const/const";
import Task from "./Task";

function TaskStatusColumn({
  status,
  tasksByStatus,
}: {
  status: StatusType;
  tasksByStatus: TasksByStatus;
}) {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { id: taskboardId } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [draggableElementHeight, setDraggableElementHeight] = useState("0");

  const { mutate: updateTaskMutation } = useMutation({
    mutationFn: (task: ITask) =>
      updateTask(
        task._id,
        taskboardId as string,
        task.title,
        task.description,
        status,
        token as IToken,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Taskboard", taskboardId] });
    },
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    return dropTargetForElements({
      element: el,
      onDragEnter: ({ source }) => {
        const task = source.data.task as ITask;
        if (task.status === status) return; // Prevents dragging over the same status
        setDraggableElementHeight(`${source.element.clientHeight}px`);
        setIsDraggedOver(true);
      },
      onDragLeave: () => {
        setIsDraggedOver(false);
        setDraggableElementHeight("0");
      },
      onDrop: ({ source }) => {
        const task = source.data.task as ITask;
        if (task.status === status) return; // Prevents dragging over the same status

        setIsDraggedOver(false);
        setDraggableElementHeight("0");
        updateTaskMutation(task);
      },
    });
  }, [status, updateTaskMutation]);

  return (
    <div key={status} ref={ref} className="flex flex-col gap-y-4">
      <div className="flex items-center gap-x-2">
        <h3 className="">{status}</h3>
        <div
          className={`items center flex justify-center rounded-full bg-userGray2 px-2 py-1 text-xs font-bold ${statusColors[status].text}`}
        >
          {tasksByStatus[status].length}
        </div>
      </div>
      <div className={`h-1 w-full ${statusColors[status].bg}`} />
      {tasksByStatus[status].map((x) => (
        <Task key={x._id} task={x} />
      ))}
      {isDraggedOver && (
        <div
          className="diagonal-stripes rounded-md bg-userGray2"
          style={{
            height: draggableElementHeight,
          }}
        />
      )}
    </div>
  );
}

export default TaskStatusColumn;
