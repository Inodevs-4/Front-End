import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import Login from "../pages/Login";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children, nivel }: { children: JSX.Element, nivel?: string }) => {
    const auth = useContext(AuthContext)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 250)

        return () => clearTimeout(timer)
    }, [])


    if (!auth.colaborador) {
        return (
            <>
                {visible ? <Loading/> : <Login/>}
            </>
        )
    }

    return children;
}