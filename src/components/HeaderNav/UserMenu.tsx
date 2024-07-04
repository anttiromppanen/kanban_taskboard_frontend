export function UserMenuMobile() {
  return <div className="overlay-bg">UserMenu</div>;
}

export function UserMenuDesktop() {
  return (
    /* position relative to the open menu button */
    <div className="absolute left-0 top-0 p-2">
      <button type="button" className="p-2">
        Profile
      </button>
      <button type="button" className="p-2">
        Logout
      </button>
    </div>
  );
}
