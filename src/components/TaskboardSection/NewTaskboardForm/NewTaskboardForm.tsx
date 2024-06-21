/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { Field, Form, Formik, FormikProps } from "formik";
import { useRef, useState } from "react";
import { AxiosError } from "axios";
import { getAllUsers } from "../../../services/userService";
import useAuth from "../../../hooks/useAuth";
import { IToken, IUser } from "../../../types/types";
import { createTaskboard } from "../../../services/taskboardService";
import { formatAxiosError } from "../../../helpers/formatting";

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

  const {
    data: users,
    isLoading: isGetUsersLoading,
    isError: isGetUsersError,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => getAllUsers(token as IToken),
  });

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
          <div className="flex flex-col gap-y-1">
            <label htmlFor="name">Name</label>
            <Field
              id="name"
              name="name"
              placeholder="Enter name for taskboard..."
              className="rounded-md bg-userGray1 px-4 py-2 placeholder:text-sm placeholder:text-neutral-500"
            />
            {errors.name && touched.name && (
              <div className="pl-2 text-red-400">{errors.name}</div>
            )}
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="description">Description</label>
            <Field
              name="description"
              id="description"
              as="textarea"
              rows="3"
              placeholder="Enter description..."
              className="rounded-md bg-userGray1 px-4 py-2 placeholder:text-sm placeholder:text-neutral-500"
            />
          </div>
          <div>
            <h4>Add users</h4>
            {isGetUsersLoading && <p>Loading users...</p>}
            {isGetUsersError && <p>Error finding users...</p>}
            {!isGetUsersLoading && !isGetUsersError && (
              <div className="mt-3 flex flex-wrap gap-x-2 gap-y-5">
                {users &&
                  users.map((user: IUser) => (
                    <div
                      key={user._id}
                      role="group"
                      aria-labelledby="checkbox-group"
                    >
                      <label
                        htmlFor={user._id}
                        className="users-checkbox-label cursor-pointer rounded-full bg-userLightBlue/100 px-4 py-2 text-sm text-black hover:brightness-110"
                      >
                        <Field
                          id={user._id}
                          type="checkbox"
                          name="addedUsers"
                          value={user._id}
                          className="appearance-none"
                        />
                        {user.username}
                      </label>
                    </div>
                  ))}
              </div>
            )}
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
