import { timeAgoFromDate } from "../../helpers/formatting";
import { IUser } from "../../types/types";

function CommentInfo({
  createdBy,
  createdAt,
}: {
  createdBy: IUser;
  createdAt: Date;
}) {
  const { username } = createdBy;

  return (
    <div className="flex items-center gap-x-2">
      <p className="ml-1 font-bold">{username}</p>
      <span className="text-[8px]">{"\u25CF"}</span>
      <p className="text-[11px] text-neutral-400">
        {timeAgoFromDate(createdAt)}
      </p>
    </div>
  );
}

export default CommentInfo;
