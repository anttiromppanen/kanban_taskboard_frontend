import { CheckIcon, TrashIcon } from "@heroicons/react/16/solid";
import { MouseEventHandler } from "react";

type ButtonType = "delete" | "resolve";

const buttonSizes = {
  sm: {
    icon: "size-3",
    button: "text-[10px] px-1",
  },
  md: {
    icon: "size-4",
    button: "text-xs p-2",
  },
};

const getIconWithStyles = (
  type: ButtonType,
  size: keyof typeof buttonSizes,
) => {
  const iconStyles = buttonSizes[size].icon;
  switch (type) {
    case "delete":
      return <TrashIcon className={iconStyles} />;
    case "resolve":
      return <CheckIcon className={iconStyles} />;
    default:
      return null;
  }
};

interface IDarkButtonProps {
  handlePress: MouseEventHandler<HTMLButtonElement>;
  text: string;
  type: ButtonType;
  size?: keyof typeof buttonSizes;
}

function DarkButton({
  handlePress,
  text,
  type,
  size = "md",
}: IDarkButtonProps) {
  const buttonStyle = buttonSizes[size].button;
  const icon = getIconWithStyles(type, size);

  return (
    <button
      type="button"
      onClick={handlePress}
      className={`
        relative z-10 flex items-center gap-x-1 rounded-md bg-userGray1/50
        text-neutral-300 hover:brightness-110
        ${buttonStyle}
      `}
    >
      {icon} {text}
    </button>
  );
}

export default DarkButton;
