import axios from "axios";
import createBearerToken from "../helpers/createBearerToken";
import { IToken, IUser, StatusType } from "../types/types";

const baseUrl = "http://localhost:3001/api/taskboard";

const getTaskboard = async (id: string, token: IToken) => {
  const response = await axios.get(`${baseUrl}/${id}`, {
    headers: { Authorization: createBearerToken(token) },
  });

  return response.data;
};

const createTaskboard = async (
  token: IToken,
  name: string,
  description: string,
  users: IUser[] | [],
) => {
  const response = await axios.post(
    baseUrl,
    { name, description, users },
    { headers: { Authorization: createBearerToken(token) } },
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

export { getTaskboard, createTaskboard, updateTask };
