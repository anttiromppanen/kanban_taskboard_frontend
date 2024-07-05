import { XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import LoginForm from "./LoginForm";

function Login() {
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  return (
    <div
      className="
        fixed left-0 top-0 flex h-dvh w-full items-center justify-center bg-userLoginBgMobile
        bg-cover bg-center md:h-screen md:bg-userLoginBgDesktop
      "
    >
      <div className="absolute -z-10 h-full w-full bg-black bg-opacity-90 backdrop-blur-sm" />
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
            invisible mb-3 mt-2 rounded-md bg-black/60 p-2 text-center
            ${errorText && "!visible text-red-500"}
            ${successText && "!visible text-green-500"}`}
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
