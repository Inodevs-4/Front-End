import { useContext } from "react";
import Login from "../pages/Login";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children, nivel }: { children: JSX.Element, nivel?: string }) => {
    const auth = useContext(AuthContext)

    if (!auth.colaborador) {
        return <Login />;
    }

    return children;
}