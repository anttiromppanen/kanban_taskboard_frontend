/* eslint-disable no-underscore-dangle */
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import TaskboardFrame from "../../components/TaskboardFrame";
import useAuth from "../../hooks/useAuth";
import { getTaskboardsForUser } from "../../services/userService";
import { ITaskboard, IToken } from "../../types/types";
import randomAvatar from "../../helpers/randomAvatar";

function TaskboardPreview({ taskboard }: { taskboard: ITaskboard }) {
  const { _id: id, name, description, createdAt, createdBy, users } = taskboard;

  return (
    <Link
      to={`taskboard/${id}`}
      className="rounded-md bg-userGray2 p-4 hover:brightness-110"
    >
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Created at {new Date(createdAt).toDateString()}</p>
      <p>Created by {createdBy.username}</p>
      <div className="mt-1 flex">
        {users.map((x) => (
          <img
            key={x._id}
            src={randomAvatar()}
            alt="Avatar"
            title={x.username}
            className="size-8 rounded-full border-2 border-userGray1 [&:not(:first-child)]:-ml-3"
          />
        ))}
      </div>
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
          <div className="mt-2 flex gap-x-4">
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
