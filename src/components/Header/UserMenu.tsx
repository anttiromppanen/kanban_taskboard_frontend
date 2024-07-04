export function UserMenuMobile() {
  return <div className="overlay-bg md:hidden">UserMenu</div>;
}

export function UserMenuDesktop() {
  return (
    /* position relative to the open menu button */
    <div className="absolute -bottom-24 left-0 z-50 hidden flex-col rounded-md bg-userGray2 p-2 shadow-xl shadow-black/50 md:flex">
      <button type="button" className="px-4 py-1">
        Profile
      </button>
      <button type="button" className="px-4 py-1">
        Logout
      </button>
    </div>
  );
}

function UserMenu() {
  return (
    <>
      <UserMenuMobile />
      <UserMenuDesktop />
    </>
  );
}

export default UserMenu;
