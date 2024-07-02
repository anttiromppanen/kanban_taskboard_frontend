/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Form, Formik, FormikProps } from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { formatAxiosError } from "../../../helpers/formatting";
import useAuth from "../../../hooks/useAuth";
import { createTaskboard } from "../../../services/taskboardService";
import { IToken, IUser } from "../../../types/types";
import StyledTextInput from "../../Form/StyledTextInput";
import UsersCheckboxGroup from "../../Form/UsersCheckboxGroup";

const NewTaskboardSchema = Yup.object().shape({
  name: Yup.string().required("Name required"),
});

interface IMutationParams {
  tokenToSend: IToken;
  taskboardName: string;
  taskboardDescription: string;
  addedUsers: IUser[];
}

interface IHandleSubmitParams {
  name: string;
  description: string;
  addedUsers: IUser[];
}

function NewTaskboardForm() {
  const queryClient = useQueryClient();
  const [submitErrorText, setSubmitErrorText] = useState("");
  const [submitSuccessText, setSubmitSuccessText] = useState("");
  const formRef = useRef<FormikProps<IHandleSubmitParams>>(null);
  const { token } = useAuth();

  const { mutate } = useMutation({
    mutationFn: ({
      tokenToSend,
      taskboardName,
      taskboardDescription,
      addedUsers,
    }: IMutationParams) =>
      createTaskboard(
        tokenToSend,
        taskboardName,
        taskboardDescription,
        addedUsers,
      ),
    onError: (error: AxiosError) => {
      formatAxiosError(error, setSubmitErrorText);
    },
    onSuccess: () => {
      setSubmitSuccessText("Taskboard created successfully");
      queryClient.invalidateQueries({ queryKey: ["taskboards"] });
      formRef.current?.resetForm();
    },
    onSettled: () => {
      setTimeout(() => setSubmitErrorText(""), 5000);
      setTimeout(() => setSubmitSuccessText(""), 5000);
    },
  });

  const handleSubmit = ({
    name,
    description,
    addedUsers,
  }: IHandleSubmitParams) => {
    const tokenToSend = token as IToken;

    mutate({
      tokenToSend,
      taskboardName: name,
      taskboardDescription: description,
      addedUsers,
    });
  };

  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        name: "",
        description: "",
        addedUsers: [],
      }}
      validationSchema={NewTaskboardSchema}
      onSubmit={(values: IHandleSubmitParams) => handleSubmit(values)}
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
            label="Name"
            name="name"
            placeholder="Enter name for taskboard..."
            errors={errors}
            touched={touched}
          />
          <StyledTextInput<IHandleSubmitParams>
            label="Description"
            name="description"
            textarea
            placeholder="Enter description..."
            errors={errors}
            touched={touched}
          />
          <div>
            <UsersCheckboxGroup />
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-userPurple py-2"
          >
            Add
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default NewTaskboardForm;
