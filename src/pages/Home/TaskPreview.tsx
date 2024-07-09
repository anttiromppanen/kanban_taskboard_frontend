import { Link } from "react-router-dom";
import { ITask, ITaskboard } from "../../types/types";

function TaskPreview({ task }: { task: ITask }) {
  const {
    _id: taskId,
    comments,
    createdAt,
    createdBy,
    description,
    status,
    taskboardId: taskboard,
    title,
    users,
  } = task;

  const { name: taskboardName, _id: taskboardId } =
    taskboard as unknown as ITaskboard;

  return (
    <Link
      to={`taskboard/${taskboardId}/task/${taskId}`}
      className="rounded-md bg-userGray2 p-4"
    >
      <h3>{title}</h3>
      <h4>Taskboard: {taskboardName}</h4>
    </Link>
  );
}

export default TaskPreview;
