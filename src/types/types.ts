export type StatusType = "Backlog" | "To do" | "In progress" | "Done";

export interface IToken {
  token: string;
  username: string;
  role: "admin" | "user";
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: StatusType;
  createdBy: string;
}

export interface User {}

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
