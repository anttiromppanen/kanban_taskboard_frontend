import { Link } from "react-router-dom";
import { ITask, ITaskboard } from "../../types/types";
import AvatarRow from "../../components/AvatarRow";
import { statusColors } from "../../const/const";

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

  const numOfComments = !comments.length
    ? "No comments"
    : `${comments.length} comments`;

  return (
    <Link
      to={`taskboard/${taskboardId}/task/${taskId}`}
      className={`preview-component border-t-2 ${statusColors[status].border}`}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <h4>{taskboardName}</h4>
      <p>{numOfComments}</p>
      <hr />
      <p className="font-bold">{status}</p>
      <p>Created at {new Date(createdAt).toDateString()}</p>
      <p>
        Created by{" "}
        <span className="font-semibold italic">{createdBy.username}</span>
      </p>
      <p className="my-2">Assigned to:</p>
      <AvatarRow users={users} />
    </Link>
  );
}

export default TaskPreview;
