import {
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/16/solid";
import { Dispatch, SetStateAction, useState } from "react";
import useAuth from "../../hooks/useAuth";
import UserMenu from "./UserMenu";

function HeaderButtons({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token } = useAuth();

  return (
    <div className="flex items-center gap-x-3">
      {token?.role === "admin" && (
        <button
          type="button"
          aria-label="New taskboard"
          title="Add new taskboard"
          onClick={() => setIsOpen(true)}
          className="flex size-8 items-center justify-center rounded-full bg-green-600 hover:brightness-125"
        >
          <PlusIcon className="size-4 text-white" />
        </button>
      )}
      <div className="relative flex items-center gap-x-2 text-neutral-300">
        <button
          type="button"
          aria-label="Toggle user menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="absolute left-0 top-0 h-full w-full"
        />
        <img
          src="https://i.pravatar.cc/50"
          alt="Avatar"
          className="size-8 rounded-full border-2 border-neutral-300 bg-userGray2"
        />
        <div className="flex items-center gap-x-1">
          <p>{token?.username}</p>
          {isMenuOpen ? (
            <ChevronDownIcon className="size-4" />
          ) : (
            <ChevronRightIcon className="size-4" />
          )}
        </div>
        {isMenuOpen && <UserMenu />}
      </div>
    </div>
  );
}

export default HeaderButtons;
