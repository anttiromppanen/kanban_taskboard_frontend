/* eslint-disable jsx-a11y/label-has-associated-control */
import { Field, Form, Formik, FormikProps } from "formik";
import { useRef } from "react";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import StyledTextInput from "../../components/Form/StyledTextInput";
import { IToken, IUser, StatusType } from "../../types/types";
import { getAllUsers } from "../../services/userService";
import useAuth from "../../hooks/useAuth";
import UsersCheckboxGroup from "../../components/Form/UsersCheckboxGroup";

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
  const { token } = useAuth();
  const formRef = useRef<FormikProps<IHandleSubmitParams>>(null);

  const {
    data: users,
    isLoading: isGetUsersLoading,
    isError: isGetUsersError,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => getAllUsers(token as IToken),
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
      onSubmit={(values) => console.log(values)}
    >
      {({ errors, touched }) => (
        <Form className="mt-4 flex flex-col gap-y-4">
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

export default NewTaskForm;
