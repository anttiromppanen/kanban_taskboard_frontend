/* eslint-disable no-underscore-dangle */
import { useEffect, useRef, useState } from "react";
import { ChatBubbleLeftIcon } from "@heroicons/react/16/solid";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { ITask } from "../../types/types";
import AvatarRow from "../../components/AvatarRow";
import { statusColors } from "../../const/const";

function Task({ task }: { task: ITask }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <>
      <button
        ref={ref}
        type="button"
        onClick={() => setIsOpen(true)}
        className={`w-full rounded-md bg-userGray2 p-3 text-left opacity-100 ${isDragging && "opacity-30"}`}
      >
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
          Created: {new Date(task.createdAt).toLocaleString()}
        </p>
        <div className="flex items-center justify-between">
          <AvatarRow users={task.users} />
          <div className="flex items-center gap-x-1">
            {task.comments.length} <ChatBubbleLeftIcon className="size-4" />
          </div>
        </div>
      </button>
      {isOpen && (
        <div className="fixed left-0 top-0 h-screen w-full bg-black/50">
          <div
            className={`fixed right-0 top-0 h-full w-1/3 border-l-4 bg-userGray2 px-8 py-4 md:h-screen ${statusColors[task.status].border}`}
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
            <p className="text-sm text-neutral-400">{task.description}</p>
            <p className="text-sm text-neutral-400">
              {new Date(task.createdAt).toLocaleString()}
            </p>
            {task.comments.length === 0 ? (
              <p>No comments</p>
            ) : (
              <div className="mt-4">
                <h3 className="text-lg">Comments</h3>
                <ul className="text-sm">
                  {task.comments.map((comment) => (
                    <li key={comment._id}>{comment.text}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Task;
