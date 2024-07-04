import { ChevronDownIcon, PlusIcon } from "@heroicons/react/16/solid";
import { Dispatch, SetStateAction } from "react";
import useAuth from "../../hooks/useAuth";

function HeaderButtons({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { token } = useAuth();

  return (
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
  );
}

export default HeaderButtons;
