import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { ReactNode } from "react";
import useAuth from "../../hooks/useAuth";
import HeaderNav from "../HeaderNav";

function TaskboardHeader() {
  const { token } = useAuth();

  return (
    <div className="flex justify-between">
      <HeaderNav title="TaskboardSection" />
      {/* USER PROFILE */}
      <button
        type="button"
        className="flex items-center gap-x-3 text-neutral-300"
      >
        <img
          src="https://i.pravatar.cc/50"
          alt="Avatar"
          className="size-7 rounded-full border-2 border-neutral-300 bg-userGray2"
        />
        <div className="flex items-center gap-x-1">
          <p>{token?.username}</p>
          <ChevronDownIcon className="size-4" />
        </div>
      </button>
    </div>
  );
}

function TaskboardSection({ children }: { children: ReactNode }) {
  return (
    <main className="h-full w-full bg-userGray1 p-8">
      <TaskboardHeader />
      <div className="mt-5 text-neutral-300">{children}</div>
    </main>
  );
}

export default TaskboardSection;
