import {
  BugAntIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { ReactNode, useState } from "react";
import { useParams } from "react-router-dom";
import { timeAgoFromDate } from "../../helpers/formatting";
import useAuth from "../../hooks/useAuth";
import useHandleComment from "../../hooks/useHandleComment";
import { CommentType, IComment, IToken } from "../../types/types";
import Reply from "../TaskboardSection/TaskReply/Reply";
import ReplyForm from "../TaskboardSection/TaskReply/ReplyForm";
import CommentInfo from "./CommentInfo";

const commentTypeIconSelector: Record<CommentType, ReactNode> = {
  question: <QuestionMarkCircleIcon className="size-5 text-neutral-400" />,
  comment: (
    <ChatBubbleBottomCenterTextIcon className="size-5 text-neutral-400" />
  ),
  bug: <BugAntIcon className="size-5 text-neutral-400" />,
};

function Comment({ comment }: { comment: IComment }) {
  const { token } = useAuth();
  const { id: taskboardId } = useParams();
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const {
    commentType,
    createdAt,
    createdBy,
    markedResolvedBy,
    resolved,
    text,
    task: taskId,
    replies,
  } = comment;

  const { username } = createdBy;
  const { avatar, deleteCommentMutate, deleteReplyMutate } = useHandleComment(
    taskboardId as string,
    taskId,
    comment._id,
    token as IToken,
  );

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
                <button
                  type="button"
                  aria-label="Delete comment"
                  onClick={() => deleteCommentMutate()}
                >
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
          <Reply
            key={reply._id}
            reply={reply}
            token={token as IToken}
            createdBy={createdBy}
            deleteReplyMutate={deleteReplyMutate}
          />
        ))}
        {isReplyOpen && (
          <ReplyForm comment={comment} setIsReplyOpen={setIsReplyOpen} />
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
