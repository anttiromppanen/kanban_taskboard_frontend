import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import AvatarRow from "../../components/AvatarRow";
import TaskboardFrame from "../../components/TaskboardFrame";
import useAuth from "../../hooks/useAuth";
import {
  getTaskboardsForUser,
  getTasksForUser,
} from "../../services/userService";
import { ITask, ITaskboard, IToken } from "../../types/types";
import TaskPreview from "./TaskPreview";

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
    <Link to={`taskboard/${id}`} className="preview-component">
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{numOfTasksText}</p>
      <hr />
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
  });

  const {
    data: userTasks,
    isLoading: tasksLoading,
    isError: tasksError,
    error: tasksErrorData,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasksForUser(token as IToken),
  });

  return (
    <TaskboardFrame>
      <div className="flex flex-col gap-y-4">
        <section>
          <h2 className="text-3xl">Taskboards</h2>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {taskboards?.data.map((x: ITaskboard) => (
              <TaskboardPreview key={x._id} taskboard={x} />
            ))}
          </div>
        </section>
        <h2 className="mt-2 text-3xl">My tasks</h2>
        <div className="grid grid-cols-4 gap-4">
          {userTasks?.map((x: ITask) => <TaskPreview key={x._id} task={x} />)}
        </div>
      </div>
    </TaskboardFrame>
  );
}

export default Home;
