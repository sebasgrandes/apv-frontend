import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// con useContext extraemos los datos

// requerimos AuthContext porque extraeremos los datos de este context
// ! usamos este custom hook para sacar la informacion del context
const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
