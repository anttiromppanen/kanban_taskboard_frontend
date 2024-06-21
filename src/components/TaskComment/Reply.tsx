/* eslint-disable jsx-a11y/label-has-associated-control */
import { Field, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { IComment } from "../../types/types";

function Reply({
  comment,
  setIsReplyOpen,
}: {
  comment: IComment;
  setIsReplyOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { text } = comment;
  return (
    <div className="ml-14 mt-1 rounded-md p-2 text-sm">
      <p>
        Replying to comment:{" "}
        <span className="text-xs italic text-neutral-500">{text}</span>
      </p>
      <Formik
        initialValues={{ replyText: "" }}
        onSubmit={(values) => console.log(values)}
      >
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
      </Formik>
      <div className="mt-1 flex items-center gap-x-2 pl-1 text-xs text-white">
        <button type="submit" className="rounded-md bg-userPurple/60 px-2 py-1">
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
    </div>
  );
}

export default Reply;
