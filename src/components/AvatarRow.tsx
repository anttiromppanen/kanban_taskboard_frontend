import { UserIcon } from "@heroicons/react/16/solid";
import randomAvatar from "../helpers/randomAvatar";

function AvatarRow({ users }: { users: { _id: string; username: string }[] }) {
  const maxThreeUsers = users.slice(0, 3);
  const remainingUsers = users.length > 3 && users.length - 3;

  return (
    <div className="flex">
      {users && users.length === 0 ? (
        <p
          key={Math.random()}
          className="mr-2 flex items-center gap-x-2 text-xs text-neutral-400"
        >
          <UserIcon className="size-4" />
          No users added
        </p>
      ) : (
        <>
          {maxThreeUsers.map((x) => (
            <img
              key={Math.random()}
              src={randomAvatar()}
              alt="Avatar"
              title={x.username}
              className="size-10 rounded-full border-4 border-userGray2 bg-userGray1 brightness-90 hover:brightness-110 [&:not(:first-child)]:-ml-4"
            />
          ))}
          {users.length > 3 && (
            <div className="flex size-10 items-center justify-center rounded-full border-2 border-userGray1 bg-userGray1 brightness-100 hover:brightness-110 [&:not(:first-child)]:-ml-5">
              +{remainingUsers}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AvatarRow;
