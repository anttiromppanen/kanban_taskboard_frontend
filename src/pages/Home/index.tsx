import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import AvatarRow from "../../components/AvatarRow";
import TaskboardFrame from "../../components/TaskboardFrame";
import useAuth from "../../hooks/useAuth";
import { getTaskboardsForUser } from "../../services/userService";
import { ITaskboard, IToken } from "../../types/types";

function TaskboardPreview({ taskboard }: { taskboard: ITaskboard }) {
  const {
    _id: id,
    name,
    description,
    createdAt,
    createdBy,
    users,
    tasks,
  } = taskboard;

  const numOfTasksText = !tasks.length ? "No tasks" : `${tasks.length} tasks`;

  return (
    <Link
      to={`taskboard/${id}`}
      className="rounded-md bg-userGray2 p-4 text-sm text-neutral-300 *:overflow-hidden *:overflow-ellipsis *:whitespace-nowrap hover:brightness-110"
    >
      <h3 className="font-bold text-neutral-200">{name}</h3>
      <p>{description}</p>
      <p>{numOfTasksText}</p>
      <hr className="my-2 border-neutral-600" />
      <p>Created at {new Date(createdAt).toDateString()}</p>
      <p className="mb-2">
        Created by{" "}
        <span className="font-semibold italic">{createdBy.username}</span>
      </p>
      <AvatarRow users={users} />
    </Link>
  );
}

function Home() {
  const { token } = useAuth();
  const {
    isLoading,
    isError,
    error,
    data: taskboards,
  } = useQuery({
    queryKey: ["taskboards"],
    queryFn: () => getTaskboardsForUser(token as IToken),
    retry: false,
  });

  return (
    <TaskboardFrame>
      <div className="flex flex-col gap-y-4">
        <section>
          <h2>Taskboards</h2>
          <div className="mt-2 grid grid-cols-4 gap-4">
            {taskboards?.data.map((x: ITaskboard) => (
              <TaskboardPreview key={x._id} taskboard={x} />
            ))}
          </div>
        </section>
        <h2>My tasks</h2>
      </div>
    </TaskboardFrame>
  );
}

export default Home;
