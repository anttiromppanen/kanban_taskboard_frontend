import {
  Bars3Icon,
  CircleStackIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => setIsOpen((state) => !state);

  return (
    <aside
      className={`
        h-dvh w-1/2 bg-userGray2 px-4 py-8 md:h-screen md:w-[300px]
        ${!isOpen && "!w-14"} 
        `}
    >
      <div
        className={`flex items-center justify-between text-neutral-200 ${!isOpen && "flex-col gap-y-4"}`}
      >
        <a href="/" className="flex items-center gap-x-1 rounded-lg">
          <CircleStackIcon className="size-7 text-userPurple" />
          <p
            className={`hidden font-userLogoFont text-2xl font-light ${isOpen && "!block"}`}
          >
            Kanban
          </p>
        </a>
        <button
          type="button"
          onClick={handleToggleOpen}
          aria-label="Toggle sidebar"
        >
          <Bars3Icon className="size-7" />
        </button>
      </div>
      {/* LINKS */}
      <ul className="mt-20 text-neutral-400 [&>li>button]:w-full [&>li>button]:py-2 [&>li>button]:text-left">
        <li>
          <button type="button" className="flex items-center gap-x-2">
            <ClipboardDocumentListIcon className="size-7" />
            <span className={isOpen ? "block" : "hidden"}>My taskboards</span>
          </button>
        </li>
        <li>
          <button type="button" className="flex items-center gap-x-2">
            <DocumentTextIcon className="size-7" />
            <span className={isOpen ? "block" : "hidden"}>My tasks</span>
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
