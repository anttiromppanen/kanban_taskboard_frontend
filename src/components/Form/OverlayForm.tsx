import { XMarkIcon } from "@heroicons/react/16/solid";
import { Dispatch, ReactNode, SetStateAction } from "react";

function OverlayForm({
  formHeading,
  setIsOpen,
  children,
}: {
  formHeading: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}) {
  return (
    <div className="overlay-bg flex items-center justify-center">
      <div className="h-full w-full overflow-y-auto rounded-md bg-userGray2 p-8 md:h-[500px] md:w-[500px]">
        <div className="flex items-center justify-between">
          <h3>{formHeading}</h3>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setIsOpen(false)}
          >
            <XMarkIcon className="size-8" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default OverlayForm;
