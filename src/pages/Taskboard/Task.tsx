import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  ChatBubbleLeftIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/16/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MouseEventHandler, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AvatarRow from "../../components/AvatarRow";
import DarkButton from "../../components/Buttons/DarkButton";
import { statusColors, statusTypes } from "../../const/const";
import { timeAgoFromDate } from "../../helpers/formatting";
import useAuth from "../../hooks/useAuth";
import { deleteTask, updateTask } from "../../services/taskService";
import { ITask, IToken, StatusType } from "../../types/types";

function Task({ task }: { task: ITask }) {
  const ref = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [isDragging, setIsDragging] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { mutate: deleteMutation } = useMutation({
    mutationFn: () => deleteTask(task._id, task.taskboardId, token as IToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Taskboard", task.taskboardId],
      });
    },
  });

  const { mutate: updateTaskMutation } = useMutation({
    mutationFn: (status: StatusType) =>
      updateTask(
        task._id,
        task.taskboardId,
        task.title,
        task.description,
        status,
        token as IToken,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Taskboard", task.taskboardId],
      });
    },
  });

  const statusesWithoutCurrent = useMemo(
    () => statusTypes.filter((status) => status !== task.status),
    [task.status],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    return draggable({
      element: el,
      getInitialData: () => ({ task }),
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
    });
  }, [task]);

  const handleOpenTask = () => {
    navigate(`task/${task._id}`);
  };

  const handleTaskDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    deleteMutation();
  };

  return (
    <div
      ref={ref}
      className={`relative w-full touch-none rounded-md bg-userGray2 p-3 text-left opacity-100 ${isDragging && "opacity-30"}`}
    >
      <button
        type="button"
        onClick={handleOpenTask}
        aria-label="Open task"
        className="absolute left-0 top-0 z-0 h-full w-full"
      />
      <div className="flex items-center justify-between">
        <h4>{task.title}</h4>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen((state) => !state)}
            className={`
            z-10 flex items-center justify-center gap-x-1 rounded-full px-3 py-1 text-[10px] text-white hover:brightness-125 
            ${statusColors[task.status].bg}
            `}
          >
            {task.status}
          </button>
          {isMenuOpen && (
            <ul
              className="
              absolute -bottom-28 left-1/2 z-20 grid -translate-x-1/2 grid-rows-[repeat(auto-fill,1fr)]
              rounded-md bg-userGray2 p-1 shadow-2xl shadow-black
              "
            >
              {statusesWithoutCurrent &&
                statusesWithoutCurrent.map((status) => (
                  <li key={status}>
                    <button
                      type="button"
                      onClick={() => updateTaskMutation(status)}
                      className="
                      flex h-full w-full items-center gap-x-2 whitespace-nowrap px-3 py-1 hover:bg-gray-800
                      hover:brightness-125
                      "
                    >
                      <div
                        className={`size-2 rounded-full ${statusColors[status].bg}`}
                      />
                      {status}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
      <p className="text-xs text-neutral-400">{task.description}</p>
      <p className="mb-1 mt-4 text-xs">
        Created: {timeAgoFromDate(task.createdAt)}
      </p>
      <div className="flex items-center justify-between">
        <AvatarRow users={task.users} />
        <div className="flex items-center gap-x-1">
          {task.comments.length} <ChatBubbleLeftIcon className="size-4" />
        </div>
      </div>
      {token && token.role === "admin" && (
        <div className="mt-3 flex w-full items-center">
          <DarkButton
            text="Delete"
            type="delete"
            handlePress={handleTaskDelete}
          />
        </div>
      )}
    </div>
  );
}

export default Task;
