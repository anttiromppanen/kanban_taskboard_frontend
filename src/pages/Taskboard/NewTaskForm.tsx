/* eslint-disable jsx-a11y/label-has-associated-control */
import { Field, Form, Formik, FormikProps } from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import StyledTextInput from "../../components/Form/StyledTextInput";
import UsersCheckboxGroup from "../../components/Form/UsersCheckboxGroup";
import { IToken, IUser, StatusType } from "../../types/types";
import { createTask } from "../../services/taskboardService";
import { formatAxiosError } from "../../helpers/formatting";
import useAuth from "../../hooks/useAuth";

const validStatuses: StatusType[] = ["Backlog", "To do", "In progress", "Done"];

const NewTaskSchema = Yup.object().shape({
  title: Yup.string().required("Title required"),
  description: Yup.string().required("Description required"),
  status: Yup.string()
    .oneOf(validStatuses, "Invalid status")
    .required("Status required"),
});

interface IHandleSubmitParams {
  title: string;
  description: string;
  status: StatusType;
  addedUsers: IUser[];
}

function NewTaskForm() {
  const queryClient = useQueryClient();
  const [submitErrorText, setSubmitErrorText] = useState("");
  const [submitSuccessText, setSubmitSuccessText] = useState("");
  const { id: taskboardId } = useParams();
  const formRef = useRef<FormikProps<IHandleSubmitParams>>(null);
  const { token } = useAuth();

  const { mutate: createTaskMutation } = useMutation({
    mutationFn: (values: IHandleSubmitParams) =>
      createTask(
        taskboardId as string,
        values.title,
        values.description,
        values.status,
        values.addedUsers,
        token as IToken,
      ),
    onError: (error: AxiosError) => {
      formatAxiosError(error, setSubmitErrorText);
    },
    onSuccess: () => {
      setSubmitSuccessText("Task created successfully");
      queryClient.invalidateQueries({ queryKey: ["Taskboard", taskboardId] });
      formRef.current?.resetForm();
    },
    onSettled: () => {
      setTimeout(() => setSubmitErrorText(""), 5000);
      setTimeout(() => setSubmitSuccessText(""), 5000);
    },
  });

  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        title: "",
        description: "",
        status: "Backlog",
        addedUsers: [],
      }}
      validationSchema={NewTaskSchema}
      onSubmit={(values) => createTaskMutation(values)}
    >
      {({ errors, touched }) => (
        <Form className="mt-4 flex flex-col gap-y-4">
          {submitErrorText.length > 0 && (
            <p className="text-red-400">{submitErrorText}</p>
          )}
          {submitSuccessText.length > 0 && (
            <p className="text-green-400">{submitSuccessText}</p>
          )}
          <StyledTextInput<IHandleSubmitParams>
            label="Title"
            name="title"
            placeholder="Enter title for task..."
            errors={errors}
            touched={touched}
          />
          <StyledTextInput<IHandleSubmitParams>
            label="Description"
            name="description"
            textarea
            placeholder="Enter description for task..."
            errors={errors}
            touched={touched}
          />
          <div>
            <h4>Status</h4>
            <div
              role="group"
              aria-labelledby="checkbox-group"
              className="horizontal-inputs-parent"
            >
              {validStatuses.map((status) => (
                <label key={status} className="rounded-input">
                  <Field
                    type="radio"
                    name="status"
                    value={status}
                    className="appearance-none"
                  />
                  {status}
                </label>
              ))}
            </div>
          </div>
          <div>
            <UsersCheckboxGroup />
          </div>
          <button type="submit" className="form-button">
            Add
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default NewTaskForm;
