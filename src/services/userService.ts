import axios from "axios";
import { IToken } from "../types/types";
import createBearerToken from "../helpers/createBearerToken";

const baseUrl = "http://localhost:3001/api/user";

export const getAllUsers = async (token: IToken) => {
  const response = await axios.get(baseUrl, {
    headers: { Authorization: createBearerToken(token) },
  });
  return response.data;
};

export const getTaskboardsForUser = async (token: IToken) => {
  const response = await axios.get(`${baseUrl}/taskboards`, {
    headers: { Authorization: createBearerToken(token) },
  });
  return response;
};

export const getTasksForUser = async (token: IToken) => {
  const response = await axios.get(`${baseUrl}/tasks`, {
    headers: { Authorization: createBearerToken(token) },
  });
  return response.data;
};
