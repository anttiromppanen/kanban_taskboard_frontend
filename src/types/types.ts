export type StatusType = "Backlog" | "To do" | "In progress" | "Done";
export type UserRoles = "admin" | "user";

export interface IToken {
  token: string;
  username: string;
  role: UserRoles;
}

export interface IComment {
  _id: string;
  text: string;
  commentType: "comment" | "question" | "bug";
  createdBy: { _id: string; username: string };
  createdAt: Date;
  resolved: boolean | Date;
  markedResolvedBy: { _id: string; username: string } | null;
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: StatusType;
  createdBy: string;
  createdAt: Date;
  users: { _id: string; username: string }[];
  comments: IComment[];
}

export interface ITaskboard {
  _id: string;
  name: string;
  description?: string;
  createdAt: Date;
  createdBy: { username: string };
  tasks: string[];
  users: { _id: string; username: string }[];
  admins: string[];
}

export type TasksByStatus = {
  [key in StatusType]: ITask[];
};
