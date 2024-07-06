/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { createReply } from "../../../services/taskboardService";
import { IComment, IToken } from "../../../types/types";

function ReplyForm({
  comment,
  setIsReplyOpen,
}: {
  comment: IComment;
  setIsReplyOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { text: commentText } = comment;
  const { token } = useAuth();
  const { id: taskboardId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: createMutate } = useMutation({
    mutationFn: ({ text }: { text: string }) =>
      createReply(
        taskboardId as string,
        comment.task,
        comment._id,
        text,
        token as IToken,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Taskboard", taskboardId] });
      setIsReplyOpen(false);
    },
  });

  return (
    <div className="ml-14 mt-1 rounded-md p-2 text-sm">
      <p>
        Replying to comment:{" "}
        <span className="text-xs italic text-neutral-500">{commentText}</span>
      </p>
      <Formik
        initialValues={{ replyText: "" }}
        onSubmit={({ replyText }) => createMutate({ text: replyText })}
      >
        <Form>
          <label htmlFor="replyText">
            <Field
              id="replyText"
              name="replyText"
              placeholder="Enter your reply..."
              as="textarea"
              rows="3"
              className="mt-2 w-full rounded-md bg-userGray1/50 p-2 text-xs text-neutral-300"
            />
          </label>
          <div className="mt-1 flex items-center gap-x-2 pl-1 text-xs text-white">
            <button
              type="submit"
              className="rounded-md bg-userPurple/60 px-2 py-1"
            >
              Reply
            </button>
            <button
              type="button"
              onClick={() => setIsReplyOpen(false)}
              className="rounded-md bg-userPink/60 px-2 py-1"
            >
              Close
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default ReplyForm;
