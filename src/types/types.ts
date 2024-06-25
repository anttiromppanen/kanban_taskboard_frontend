export type StatusType = "Backlog" | "To do" | "In progress" | "Done";
export type UserRoles = "admin" | "user";
export type CommentType = "comment" | "question" | "bug";

export interface IToken {
  token: string;
  username: string;
  role: UserRoles;
}

export interface IUser {
  _id: string;
  username: string;
}

export interface IComment {
  _id: string;
  text: string;
  commentType: "comment" | "question" | "bug";
  createdBy: IUser;
  createdAt: Date;
  resolved: boolean | Date;
  markedResolvedBy: IUser | null;
  replies: { _id: string; text: string; createdBy: IUser; createdAt: Date }[];
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: StatusType;
  createdBy: string;
  createdAt: Date;
  taskboardId: string;
  users: IUser[];
  comments: IComment[];
}

export interface ITaskboard {
  _id: string;
  name: string;
  description?: string;
  createdAt: Date;
  createdBy: IUser;
  tasks: string[];
  users: IUser[];
  admins: string[];
}

export type TasksByStatus = {
  [key in StatusType]: ITask[];
};
