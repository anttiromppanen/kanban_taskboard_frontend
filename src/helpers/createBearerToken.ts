import { IToken } from "../types/types";

const createBearerToken = (token: IToken) => `Bearer ${token.token}`;

export default createBearerToken;
