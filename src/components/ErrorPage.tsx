import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "Unknown error";
  }

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center text-neutral-200 md:h-screen">
      <h1 className="font-userLogoFont text-8xl text-red-400">Oops!</h1>
      <p className="mt-8">Sorry, an unexpected error has occurred.</p>
      <p className="mt-4 text-2xl underline underline-offset-8">
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
