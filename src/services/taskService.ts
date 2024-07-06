import axios from "axios";
import createBearerToken from "../helpers/createBearerToken";
import { IToken, IUser, StatusType } from "../types/types";

const baseUrl = "http://localhost:3001/api/taskboard";

const createTask = async (
  taskboardId: string,
  title: string,
  description: string,
  status: StatusType,
  users: IUser[],
  token: IToken,
) => {
  const response = await axios.post(
    `${baseUrl}/${taskboardId}/task`,
    { title, description, status, users },
    {
      headers: { Authorization: createBearerToken(token) },
    },
  );

  return response.data;
};

const updateTask = async (
  taskId: string,
  taskboardId: string,
  title: string,
  description: string,
  status: StatusType,
  token: IToken,
) => {
  const response = await axios.put(
    `${baseUrl}/${taskboardId}/task/${taskId}`,
    { title, description, status },
    {
      headers: { Authorization: createBearerToken(token) },
    },
  );

  return response.data;
};

const deleteTask = async (
  taskId: string,
  taskboardId: string,
  token: IToken,
) => {
  const response = await axios.delete(
    `${baseUrl}/${taskboardId}/task/${taskId}`,
    {
      headers: { Authorization: createBearerToken(token) },
    },
  );

  return response.data;
};

export { createTask, updateTask, deleteTask };
