import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  CalendarDaysIcon,
  ChatBubbleLeftIcon,
  PlusCircleIcon,
} from "@heroicons/react/16/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import AvatarRow from "../../components/AvatarRow";
import DarkButton from "../../components/Buttons/DarkButton";
import Comment from "../../components/TaskComment/Comment";
import { statusColors } from "../../const/const";
import { timeAgoFromDate } from "../../helpers/formatting";
import useAuth from "../../hooks/useAuth";
import { deleteTask } from "../../services/taskService";
import { ITask, IToken } from "../../types/types";
import NewComment from "./NewComment";

function AddCommentButton({
  setIsCommenting,
}: {
  setIsCommenting: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      aria-label="Add comment"
      onClick={() => setIsCommenting((state) => !state)}
      className="p-1"
    >
      <PlusCircleIcon className="size-4 text-userGreen" />
    </button>
  );
}

function Task({ task }: { task: ITask }) {
  const ref = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const [isDragging, setIsDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

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

  const handleTaskDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    deleteMutation();
  };

  return (
    <>
      <div
        ref={ref}
        className={`relative w-full rounded-md bg-userGray2 p-3 text-left opacity-100 ${isDragging && "opacity-30"}`}
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open task"
          className="absolute left-0 top-0 z-0 h-full w-full"
        />
        <div className="flex items-center justify-between">
          <h4>{task.title}</h4>
          <div
            className={`flex items-center justify-center rounded-full px-3 py-1 text-[10px] text-white ${statusColors[task.status].bg}`}
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
      {isOpen && (
        <aside className="fixed left-0 top-0 z-20 h-screen w-full bg-black/50">
          <div
            className={`fixed right-0 top-0 h-full w-full border-l-4 bg-userGray2 px-8 py-4 md:h-screen md:w-1/2 lg:w-1/3 ${statusColors[task.status].border}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2 text-sm">
                <div
                  className={`size-3 rounded-full ${statusColors[task.status].bg}`}
                />
                <p>{task.status}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2"
              >
                Close
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <h3 className="text-2xl">{task.title}</h3>
              <AvatarRow users={task.users} />
            </div>
            <p className="-mt-1 text-sm text-neutral-400">{task.description}</p>

            <p className="mt-4 flex items-center gap-x-2 text-sm text-neutral-400">
              <CalendarDaysIcon className="size-5" />{" "}
              {new Date(task.createdAt).toLocaleString()}
            </p>
            <div className="mt-4">
              {task.comments.length === 0 ? (
                <div>
                  <div className="mt-4 flex items-center gap-x-2">
                    <h3 className="text-lg">No comments</h3>
                    <AddCommentButton setIsCommenting={setIsCommenting} />
                  </div>
                  {isCommenting && (
                    <NewComment task={task} setIsCommenting={setIsCommenting} />
                  )}
                </div>
              ) : (
                <div className="mt-4">
                  <div className="flex items-center gap-x-2">
                    <h3 className="text-lg">Comments</h3>
                    <AddCommentButton setIsCommenting={setIsCommenting} />
                  </div>
                  <hr className="mt-2 border-neutral-700" />
                  {isCommenting && (
                    <NewComment task={task} setIsCommenting={setIsCommenting} />
                  )}
                  <ul className="text-sm">
                    {task.comments.map((comment) => (
                      <Comment key={comment._id} comment={comment} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

export default Task;
