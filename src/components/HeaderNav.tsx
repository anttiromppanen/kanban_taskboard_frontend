import { ArrowLeftCircleIcon } from "@heroicons/react/16/solid";
import { useLocation, useNavigate } from "react-router-dom";

function HeaderNav({ title }: { title: string }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => location.pathname !== "/" && navigate(-1);

  return (
    <div className="flex items-center gap-x-4 text-neutral-200">
      <button type="button" aria-label="Go back" onClick={handleBackClick}>
        <ArrowLeftCircleIcon className="size-7 text-neutral-500" />
      </button>
      <button
        type="button"
        aria-label="Go back"
        onClick={() => navigate(+1)}
        className="rotate-180"
      >
        <ArrowLeftCircleIcon className="size-7 text-neutral-500" />
      </button>
      <h1>{title}</h1>
    </div>
  );
}

export default HeaderNav;
