import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import randomAvatar from "../helpers/randomAvatar";
import { deleteComment, deleteReply } from "../services/taskboardService";
import { IToken } from "../types/types";

const useHandleComment = (
  taskboardId: string,
  taskId: string,
  commentId: string,
  token: IToken,
) => {
  const queryClient = useQueryClient();

  const avatar = useMemo(() => randomAvatar(), []);

  const { mutate: deleteCommentMutate } = useMutation({
    mutationFn: () =>
      deleteComment(taskboardId as string, taskId, commentId, token as IToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Taskboard", taskboardId] });
    },
  });

  const { mutate: deleteReplyMutate } = useMutation({
    mutationFn: ({ replyId }: { replyId: string }) =>
      deleteReply(
        taskboardId as string,
        taskId,
        commentId,
        replyId,
        token as IToken,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Taskboard", taskboardId] });
    },
  });

  return { deleteCommentMutate, deleteReplyMutate, avatar };
};

export default useHandleComment;
