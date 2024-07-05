import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { EyeIcon } from "@heroicons/react/16/solid";
import useAuth from "../../hooks/useAuth";
import loginUser from "../../services/loginService";
import StyledTextInput from "../Form/StyledTextInput";

const ValidationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

interface ILoginFormProps {
  setErrorText: (text: string) => void;
  setSuccessText: (text: string) => void;
}

interface ISubmitFormParams {
  username: string;
  password: string;
}

function LoginForm({ setErrorText, setSuccessText }: ILoginFormProps) {
  const navigate = useNavigate();
  const { setTokenFunc } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: submitFormMutate } = useMutation({
    mutationFn: ({ username, password }: ISubmitFormParams) =>
      loginUser(username, password),
    onSuccess: (data) => {
      setTokenFunc(data);
      setSuccessText("Successful login, redirecting...");
      setTimeout(() => navigate("/", { replace: true }), 3 * 1000);
    },
    onError: (error: AxiosError) => {
      if (error?.response && error?.response.data) {
        const errorResponse = error.response.data as { error: string };
        setErrorText(errorResponse.error);
      } else {
        setErrorText(error.message);
      }
    },
    onSettled: () => {
      setTimeout(() => setErrorText(""), 5000);
      setTimeout(() => setSuccessText(""), 5000);
    },
  });
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={ValidationSchema}
      onSubmit={(values: ISubmitFormParams) => submitFormMutate(values)}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-y-2">
          <StyledTextInput
            name="username"
            label="Username"
            placeholder="Enter username..."
            errors={errors}
            touched={touched}
          />
          <div className="relative">
            <StyledTextInput
              name="password"
              label="Password"
              placeholder="Enter password..."
              type={showPassword ? "text" : "password"}
              errors={errors}
              touched={touched}
            />
            <button
              type="button"
              aria-label="Toggle show password"
              onClick={() => setShowPassword((state) => !state)}
              className={`
                absolute right-4 top-9 text-neutral-500 hover:brightness-125 
                ${showPassword && "!text-neutral-300"}
              `}
            >
              <EyeIcon className="size-6" />
            </button>
          </div>
          <button type="submit" className="form-button">
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
