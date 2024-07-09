import useAuth from "../../hooks/useAuth";

interface IMenuProps {
  removeTokenFunc: () => void;
}

export function UserMenuMobile({ removeTokenFunc }: IMenuProps) {
  return <div className="overlay-bg md:hidden">UserMenu</div>;
}

export function UserMenuDesktop({ removeTokenFunc }: IMenuProps) {
  return (
    /* position relative to the open menu button */
    <div className="absolute -bottom-24 left-0 z-50 hidden flex-col rounded-md bg-userGray2 p-2 shadow-xl shadow-black/50 md:flex">
      <button type="button" className="px-4 py-1 hover:brightness-125">
        Profile
      </button>
      <button
        type="button"
        onClick={removeTokenFunc}
        className="px-4 py-1 hover:brightness-125"
      >
        Logout
      </button>
    </div>
  );
}

function UserMenu() {
  const { removeTokenFunc } = useAuth();
  return (
    <>
      <UserMenuMobile removeTokenFunc={removeTokenFunc} />
      <UserMenuDesktop removeTokenFunc={removeTokenFunc} />
    </>
  );
}

export default UserMenu;
