import { create } from "zustand";
import { IToken } from "../types/types";

interface State {
  user: IToken | null;
  setUser: (token: IToken) => void;
}

const useUserStore = create<State>()((set) => ({
  user: null,
  setUser: (token: IToken) => set({ user: token }),
}));

export default useUserStore;
