import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import Forbidden from "../pages/Forbidden";
import Login from "../pages/Login";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children, nivel }: { children: JSX.Element, nivel?: string }) => {
    const auth = useContext(AuthContext)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(true)
        
        const timer = setTimeout(() => {
            setVisible(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])


    if (!auth.colaborador) {
        return (
            <>
                {visible ? <Loading/> : <Login/>}
            </>
        )
    }
    
    if (nivel === 'administrador'){
        if (auth.colaborador.perfil !== nivel){
            return <Forbidden />
        }
    }

    if (nivel === 'gestor'){
        if (auth.colaborador.perfil !== nivel && auth.colaborador.perfil !== 'administrador'){
            return <Forbidden />
        }
    }
    
    return children;
}