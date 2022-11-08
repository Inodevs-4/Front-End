import { AuthContext } from './AuthContext'
import { useState, useEffect } from 'react'
import { Colaborador } from '../types/Types'
import { login, validateToken } from '../hooks/Login'

export const AuthProvider = ({children} : {children: JSX.Element}) => {

    const [isLoading, setIsLoading] = useState(true)
    const [colaborador, setColaborador] = useState<Colaborador | null>(null) 

    useEffect(() => {
        const validarToken = async () => {
            const storageData = localStorage.getItem('token')
            if (storageData) {
                const data = await validateToken(storageData)
                if (data.matricula) {
                    setColaborador(data);
                }
            }
            setIsLoading(false)
        }
        validarToken();
    }, []);

    const signin = async (email: string, senha: string) => {
        const data = await login(email, senha)
        
        if (data.usuario && data.token) {
            setColaborador(data.usuario);
            setToken(data.token);
            return true;
        }
        return false;
    }
    
    const signout = () => {
        setColaborador(null)
        setToken('')
    }

    const setToken = (token: string) => {
        localStorage.setItem('token', token);
    }

    return (
        <AuthContext.Provider value={{colaborador, signin, signout, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}