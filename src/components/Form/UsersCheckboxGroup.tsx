import { useQuery } from "@tanstack/react-query";
import { Field } from "formik";
import useAuth from "../../hooks/useAuth";
import { getUsersForTaskboard } from "../../services/taskboardService";
import { IToken, IUser } from "../../types/types";

interface IUsersCheckboxGroupProps {
  taskboardId: string;
}

function UsersCheckboxGroup({ taskboardId }: IUsersCheckboxGroupProps) {
  const { token } = useAuth();

  const {
    data: users,
    isLoading: isGetUsersLoading,
    isError: isGetUsersError,
  } = useQuery({
    queryKey: ["users", taskboardId],
    queryFn: () => getUsersForTaskboard(taskboardId, token as IToken),
  });

  return (
    <>
      <h4>Add users</h4>
      {isGetUsersLoading && <p>Loading users...</p>}
      {isGetUsersError && <p>Error finding users...</p>}
      {!isGetUsersLoading && !isGetUsersError && (
        <div
          role="group"
          aria-labelledby="checkbox-group"
          className="horizontal-inputs-parent"
        >
          {users &&
            users.map((user: IUser) => (
              <label
                key={user._id}
                htmlFor={user._id}
                className="rounded-input"
              >
                <Field
                  id={user._id}
                  type="checkbox"
                  name="addedUsers"
                  value={user._id}
                  className="appearance-none"
                />
                {user.username}
              </label>
            ))}
        </div>
      )}
    </>
  );
}

export default UsersCheckboxGroup;
