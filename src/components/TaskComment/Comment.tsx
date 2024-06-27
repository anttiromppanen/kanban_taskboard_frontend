/* eslint-disable no-underscore-dangle */
import { ReactNode, useMemo, useState } from "react";
import {
  BugAntIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import randomAvatar from "../../helpers/randomAvatar";
import { CommentType, IComment, IUser } from "../../types/types";
import { timeAgoFromDate } from "../../helpers/formatting";
import Reply from "./Reply";
import useAuth from "../../hooks/useAuth";

const commentTypeIconSelector: Record<CommentType, ReactNode> = {
  question: <QuestionMarkCircleIcon className="size-5 text-neutral-400" />,
  comment: (
    <ChatBubbleBottomCenterTextIcon className="size-5 text-neutral-400" />
  ),
  bug: <BugAntIcon className="size-5 text-neutral-400" />,
};

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

function Comment({ comment }: { comment: IComment }) {
  const { token } = useAuth();
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const {
    commentType,
    createdAt,
    createdBy,
    markedResolvedBy,
    resolved,
    text,
    replies,
  } = comment;

  const { username } = createdBy;
  const avatar = useMemo(() => randomAvatar(), []);

  return (
    <li className="mt-2">
      <div className={`p-2 ${resolved && "border-l-4 border-l-green-500"}`}>
        <div className="flex items-center pr-1">
          <div className="size-8 rounded-full border-2 border-neutral-400">
            <img
              src={avatar}
              alt="Avatar"
              title={username}
              className="rounded-full bg-userGray1"
            />
          </div>
          <div className="ml-2 flex w-full items-center justify-between">
            <CommentInfo createdBy={createdBy} createdAt={createdAt} />
            <div className="flex items-center gap-x-2">
              {token?.id === createdBy._id && (
                <button type="button" aria-label="Delete comment">
                  <TrashIcon className="size-4 text-red-600" />
                </button>
              )}
              <button
                type="button"
                aria-label={`Reply to ${createdBy.username}`}
                title={`Reply to ${createdBy.username}`}
                onClick={() => setIsReplyOpen((state) => !state)}
              >
                {commentTypeIconSelector[commentType]}
              </button>
            </div>
          </div>
        </div>
        <div className="ml-10 rounded-md bg-userGray1/50 p-2 text-xs text-neutral-300">
          {text}
        </div>
        {replies.map((reply) => (
          <div key={reply._id} className="ml-14 mt-1">
            <div className="flex items-center justify-between pr-1">
              <CommentInfo
                createdBy={reply.createdBy}
                createdAt={reply.createdAt}
              />
              {token?.id === createdBy._id && (
                <button type="button" aria-label="Delete comment">
                  <TrashIcon className="size-4 text-red-600" />
                </button>
              )}
            </div>
            <div className="mt-1.5 rounded-md bg-userGray1/50 p-2 text-xs text-neutral-300">
              {reply.text}
            </div>
          </div>
        ))}
        {isReplyOpen && (
          <Reply comment={comment} setIsReplyOpen={setIsReplyOpen} />
        )}
      </div>
      {resolved && (
        <div className="flex w-full items-center justify-end gap-x-2 text-[10px]">
          <CheckCircleIcon className="size-3 text-green-500" />
          <p>
            Resolved by: {markedResolvedBy?.username},{" "}
            {timeAgoFromDate(resolved as Date)}
          </p>
        </div>
      )}
    </li>
  );
}

export default Comment;
