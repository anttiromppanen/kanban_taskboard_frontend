/* eslint-disable no-underscore-dangle */
import { UserIcon } from "@heroicons/react/16/solid";
import randomAvatar from "../helpers/randomAvatar";

function AvatarRow({ users }: { users: { _id: string; username: string }[] }) {
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
        users.map((x) => (
          <img
            // key={x._id}
            key={Math.random()}
            src={randomAvatar()}
            alt="Avatar"
            title={x.username}
            className="size-10 rounded-full border-4 border-userGray2 brightness-90 hover:brightness-110 [&:not(:first-child)]:-ml-4"
          />
        ))
      )}
    </div>
  );
}

export default AvatarRow;
