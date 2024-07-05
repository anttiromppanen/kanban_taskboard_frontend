import { EyeIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
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

function Login() {
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  return (
    <div className="fixed left-0 top-0 z-10 flex h-dvh w-full items-center justify-center bg-black/80 md:h-screen">
      <div>
        <h1 className="mb-10 text-center font-userLogoFont text-5xl text-white">
          Kanban taskboards
        </h1>
        <div className="h-full w-full rounded-md bg-userGray2 p-4 text-neutral-300 md:h-auto md:w-[500px]">
          <div className="relative">
            <h1 className="text-4xl font-bold">LOG IN</h1>
            <button
              type="button"
              aria-label="Close"
              className="absolute right-2 top-1/2 size-6 -translate-y-1/2 text-neutral-300"
            >
              <XMarkIcon />
            </button>
          </div>
          <div
            className={`
            invisible mb-3 mt-2 rounded-md p-2 text-center 
            ${errorText && "!visible bg-red-500"}
            ${successText && "!visible bg-green-500"}`}
          >
            {errorText || successText || "¤"}
          </div>
          <LoginForm
            setErrorText={setErrorText}
            setSuccessText={setSuccessText}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
