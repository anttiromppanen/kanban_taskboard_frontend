import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { ChatBubbleLeftIcon } from "@heroicons/react/16/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AvatarRow from "../../components/AvatarRow";
import DarkButton from "../../components/Buttons/DarkButton";
import { statusColors } from "../../const/const";
import { timeAgoFromDate } from "../../helpers/formatting";
import useAuth from "../../hooks/useAuth";
import { deleteTask } from "../../services/taskService";
import { ITask, IToken } from "../../types/types";
import TaskOverlay from "./TaskOverlay";

function Task({ task }: { task: ITask }) {
  const ref = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [isDragging, setIsDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteMutation } = useMutation({
    mutationFn: () => deleteTask(task._id, task.taskboardId, token as IToken),
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["Taskboard", task.taskboardId],
      });
    },
  });

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
    setIsOpen(true);
  };

  const handleTaskDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    deleteMutation();
  };

  return (
    <div
      ref={ref}
      className={`relative w-full rounded-md bg-userGray2 p-3 text-left opacity-100 ${isDragging && "opacity-30"}`}
    >
      <button
        type="button"
        onClick={handleOpenTask}
        aria-label="Open task"
        className="absolute left-0 top-0 z-0 h-full w-full"
      />
      <div className="flex items-center justify-between">
        <h4>{task.title}</h4>
        <div
          className={`
            flex items-center justify-center rounded-full px-3 py-1 text-[10px] text-white 
            ${statusColors[task.status].bg}
            `}
        >
          {task.status}
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
