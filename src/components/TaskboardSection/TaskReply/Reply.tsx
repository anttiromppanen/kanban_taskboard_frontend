import { TrashIcon } from "@heroicons/react/16/solid";
import { UseMutateFunction } from "@tanstack/react-query";
import { IReply, IToken, IUser } from "../../../types/types";
import CommentInfo from "../../TaskComment/CommentInfo";

interface IReplyProps {
  reply: IReply;
  token: IToken;
  createdBy: IUser;
  deleteReplyMutate: UseMutateFunction<
    unknown,
    Error,
    {
      replyId: string;
    },
    unknown
  >;
}

function Reply({ reply, token, createdBy, deleteReplyMutate }: IReplyProps) {
  return (
    <div key={reply._id} className="ml-14 mt-1">
      <div className="flex items-center justify-between pr-1">
        <CommentInfo createdBy={reply.createdBy} createdAt={reply.createdAt} />
        {token?.id === createdBy._id && (
          <button
            type="button"
            aria-label="Delete comment"
            onClick={() => deleteReplyMutate({ replyId: reply._id })}
          >
            <TrashIcon className="size-4 text-red-600" />
          </button>
        )}
      </div>
      <div className="mt-1.5 rounded-md bg-userGray1/50 p-2 text-xs text-neutral-300">
        {reply.text}
      </div>
    </div>
  );
}

export default Reply;
