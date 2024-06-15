import axios from "axios";
import { IToken } from "../types/types";
import createBearerToken from "../helpers/createBearerToken";

const baseUrl = "http://localhost:3001/api/user";

export const getTaskboardsForUser = async (token: IToken) => {
  const response = await axios.get(`${baseUrl}/taskboards`, {
    headers: { Authorization: createBearerToken(token) },
  });
  return response;
};

export const getRidOfFuckingPreferExportDefault = () => {};