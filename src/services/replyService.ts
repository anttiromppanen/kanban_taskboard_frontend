import axios from "axios";
import { IToken } from "../types/types";
import createBearerToken from "../helpers/createBearerToken";

const baseUrl = "http://localhost:3001/api/taskboard";

const createReply = async (
  taskboardId: string,
  taskId: string,
  commentId: string,
  replyText: string,
  token: IToken,
) => {
  const response = await axios.post(
    `${baseUrl}/${taskboardId}/task/${taskId}/comment/${commentId}/reply`,
    { text: replyText },
    {
      headers: { Authorization: createBearerToken(token) },
    },
  );

  return response.data;
};

const deleteReply = async (
  taskboardId: string,
  taskId: string,
  commentId: string,
  replyId: string,
  token: IToken,
) => {
  const response = await axios.delete(
    `${baseUrl}/${taskboardId}/task/${taskId}/comment/${commentId}/reply/${replyId}`,
    {
      headers: { Authorization: createBearerToken(token) },
    },
  );

  return response.data;
};

export { createReply, deleteReply };
