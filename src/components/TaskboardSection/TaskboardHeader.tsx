import {
  ChevronDownIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { Dispatch, SetStateAction, useState } from "react";
import useAuth from "../../hooks/useAuth";
import HeaderNav from "../HeaderNav";
import NewTaskboardForm from "./NewTaskboardForm/NewTaskboardForm";

function NewTaskboardOverlay({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed left-0 top-0 z-10 flex h-dvh w-full items-center justify-center bg-black/80 text-neutral-300 md:h-screen">
      <div className="h-full w-full overflow-y-auto rounded-md bg-userGray2 p-8 md:h-[500px] md:w-[500px]">
        <div className="flex items-center justify-between">
          <h3>Add new taskboard</h3>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setIsOpen(false)}
          >
            <XMarkIcon className="size-8" />
          </button>
        </div>
        <NewTaskboardForm />
      </div>
    </div>
  );
}

function TaskboardHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useAuth();

  return (
    <>
      {isOpen && <NewTaskboardOverlay setIsOpen={setIsOpen} />}
      <div className="flex justify-between">
        <HeaderNav title="TaskboardSection" />
        {/* USER PROFILE */}
        <div className="flex items-center gap-x-3">
          {token?.role === "admin" && (
            <button
              type="button"
              aria-label="New taskboard"
              title="Add new taskboard"
              onClick={() => setIsOpen(true)}
              className="flex size-8 items-center justify-center rounded-full bg-green-600"
            >
              <PlusIcon className="size-4 text-white" />
            </button>
          )}
          <button
            type="button"
            className="flex items-center gap-x-2 text-neutral-300"
          >
            <img
              src="https://i.pravatar.cc/50"
              alt="Avatar"
              className="size-8 rounded-full border-2 border-neutral-300 bg-userGray2"
            />
            <div className="flex items-center gap-x-1">
              <p>{token?.username}</p>
              <ChevronDownIcon className="size-4" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default TaskboardHeader;
