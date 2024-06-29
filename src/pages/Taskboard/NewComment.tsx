/* eslint-disable jsx-a11y/label-has-associated-control */
import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { Dispatch, SetStateAction, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { ITask, IToken } from "../../types/types";
import { createComment } from "../../services/taskboardService";

const validationSchema = Yup.object({
  commentText: Yup.string().required("Text required"),
});

interface MutationParams {
  commentText: string;
  commentType: string;
}

function NewComment({
  task,
  setIsCommenting,
}: {
  task: ITask;
  setIsCommenting: Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const formRef = useRef<FormikProps<MutationParams>>(null);
  const { token } = useAuth();

  const { mutate } = useMutation({
    mutationFn: ({ commentText, commentType }: MutationParams) =>
      createComment(
        task._id,
        task.taskboardId,
        commentText,
        commentType,
        token as IToken,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Taskboard", task.taskboardId],
      });
      setIsCommenting(false);
      formRef.current?.resetForm();
    },
  });

  return (
    <div className="mt-2">
      <Formik
        innerRef={formRef}
        initialValues={{ commentText: "", commentType: "comment" }}
        validationSchema={validationSchema}
        onSubmit={({ commentText, commentType }) =>
          mutate({ commentText, commentType })
        }
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="commentText">
              <Field
                id="commentText"
                name="commentText"
                placeholder="Enter your comment..."
                as="textarea"
                rows="4"
                className="w-full rounded-md bg-userGray1/50 p-2 text-xs text-neutral-300"
              />
            </label>
            <div className="mt-1 flex w-full items-center justify-between gap-x-2 pr-2 text-sm text-white">
              <Field
                as="select"
                name="commentType"
                className="rounded-md bg-userPurple/60 py-1"
              >
                <option value="comment">comment</option>
                <option value="question">question</option>
                <option value="bug">bug</option>
              </Field>
              <div className="flex gap-x-2">
                <button
                  type="submit"
                  className="rounded-md bg-userPurple/60 px-2 py-1"
                >
                  Comment
                </button>
                <button
                  type="button"
                  onClick={() => setIsCommenting(false)}
                  className="rounded-md bg-userPink/60 px-2 py-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default NewComment;
