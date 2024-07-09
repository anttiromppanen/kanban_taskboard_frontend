import { CalendarDaysIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AvatarRow from "../../components/AvatarRow";
import Comment from "../../components/TaskComment/Comment";
import { statusColors } from "../../const/const";
import useAuth from "../../hooks/useAuth";
import { getTask } from "../../services/taskService";
import { ITask, ITaskboard, IToken } from "../../types/types";
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

function TaskOverlay() {
  const navigate = useNavigate();
  const { id: taskboardId, taskId } = useParams();
  const { token } = useAuth();
  const [isCommenting, setIsCommenting] = useState(false);

  const {
    data: task,
    isLoading,
    isError,
  } = useQuery<ITask>({
    queryKey: ["Task", taskId],
    queryFn: () =>
      getTask(taskId as string, taskboardId as string, token as IToken),
  });

  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-full bg-black/50">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading task</p>}
      {!isLoading && !isError && task && (
        <div
          className={`
        fixed right-0 top-0 h-full w-full border-l-4 bg-userGray2 px-8 py-4 
        md:h-screen md:w-1/2 lg:w-1/3 
        ${statusColors[task.status].border}
        `}
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
              onClick={() =>
                navigate(
                  `/taskboard/${(task.taskboardId as unknown as ITaskboard)._id}`,
                )
              }
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
      )}
    </aside>
  );
}

export default TaskOverlay;
