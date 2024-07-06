import axios from "axios";
import createBearerToken from "../helpers/createBearerToken";
import { IToken, IUser } from "../types/types";

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

export { createTaskboard, getTaskboard };
