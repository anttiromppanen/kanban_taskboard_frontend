import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

const useAuth = () => useContext(AuthContext);

export default useAuth;
