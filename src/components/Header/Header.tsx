import { useState } from "react";
import OverlayForm from "../Form/OverlayForm";
import NewTaskboardForm from "../TaskboardSection/NewTaskboardForm/NewTaskboardForm";
import HeaderButtons from "./HeaderButtons";
import HeaderNav from "./HeaderNav";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <OverlayForm formHeading="Add new taskboard" setIsOpen={setIsOpen}>
          <NewTaskboardForm />
        </OverlayForm>
      )}
      <div className="flex justify-between">
        <HeaderNav title="TaskboardSection" />
        <HeaderButtons setIsOpen={setIsOpen} />
      </div>
    </>
  );
}

export default Header;
