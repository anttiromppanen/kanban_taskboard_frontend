import { XMarkIcon } from "@heroicons/react/16/solid";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginUser from "../../services/loginService";
import useAuth from "../../hooks/useAuth";

const inputStyles =
  "rounded-md bg-neutral-300 w-full px-4 py-2 text-black placeholder:text-userGray2/60";

function Login() {
  const { setTokenFunc } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("matti");
  const [password, setPassword] = useState("teppo");
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const { mutate } = useMutation({
    mutationFn: () => loginUser(username, password),
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

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="fixed left-0 top-0 z-10 flex h-dvh w-full items-center justify-center bg-black/80 md:h-screen">
      <div className="h-full w-full rounded-md bg-userGray2 p-4 text-neutral-300 md:h-auto md:w-[500px]">
        <div className="relative">
          <h1 className="text-center font-userLogoFont text-4xl font-bold">
            LOG IN
          </h1>
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
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-4">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className={inputStyles}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className={inputStyles}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-userPurple px-4 py-2"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
