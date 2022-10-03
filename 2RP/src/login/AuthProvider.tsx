import { AuthContext } from './AuthContext'
import { useState, useEffect } from 'react'
import { Colaborador } from '../types/Types'

export const AuthProvider = ({children} : {children: JSX.Element}) => {

    const [colaborador, setColaborador] = useState<Colaborador | null>(null) 

    useEffect(() => {
        const validateToken = async () => {
            const storageData = localStorage.getItem('token')
            if (storageData) {
                const data = await fetch(`${process.env.REACT_APP_SERVER}/validateToken`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${storageData}`
                    }
                }).then(resp => resp.json())
                .then((data) => {
                    return data
                }).catch(err => console.log(err))
                if (data.id) {
                    setColaborador(data);
                }
            }
        }
        validateToken();
    }, []);


    const signin = async (email: string, senha: string) => {
        const data = await fetch(`${process.env.REACT_APP_SERVER}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, senha}),
        })
            .then((resp) => resp.json())
            .then((data) => {
                return data
            })
            .catch((err) => console.log(err))
        
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
        <AuthContext.Provider value={{colaborador, signin, signout}}>
            {children}
        </AuthContext.Provider>
    )
}