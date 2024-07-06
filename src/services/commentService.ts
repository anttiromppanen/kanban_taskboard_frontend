import axios from "axios";
import createBearerToken from "../helpers/createBearerToken";
import { IToken } from "../types/types";

const baseUrl = "http://localhost:3001/api/taskboard";

const createComment = async (
  taskId: string,
  taskboardId: string,
  commentText: string,
  commentType: string,
  token: IToken,
) => {
  const response = await axios.post(
    `${baseUrl}/${taskboardId}/task/${taskId}/comment`,
    { text: commentText, commentType },
    {
      headers: { Authorization: createBearerToken(token) },
    },
  );

  return response.data;
};

const deleteComment = async (
  taskboardId: string,
  taskId: string,
  commentId: string,
  token: IToken,
) => {
  const response = await axios.delete(
    `${baseUrl}/${taskboardId}/task/${taskId}/comment/${commentId}`,
    {
      headers: { Authorization: createBearerToken(token) },
    },
  );

  return response.data;
};

const setResolved = async (
  taskboardId: string,
  taskId: string,
  commentId: string,
  token: IToken,
) => {
  const response = await axios.put(
    `${baseUrl}/${taskboardId}/task/${taskId}/comment/${commentId}/resolve`,
    {},
    {
      headers: { Authorization: createBearerToken(token) },
    },
  );

  return response.data;
};

export { createComment, deleteComment, setResolved };
