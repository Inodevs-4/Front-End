import { AuthContext } from './AuthContext'
import { useState, useEffect } from 'react'
import { Colaborador } from '../types/Types'
import { login, loginOauth, validateGoogle, validateToken } from '../hooks/Login'
import { getColaborador } from '../hooks/Colaborador'
import { gapi } from 'gapi-script';

export const AuthProvider = ({children} : {children: JSX.Element}) => {

    const [isLoading, setIsLoading] = useState(true)
    const [colaborador, setColaborador] = useState<Colaborador | null>(null) 
    const clientId = "543027514884-ept5i2fd8qfui6t372cdov2p327rh511.apps.googleusercontent.com"

    useEffect(() => {
        function start() {
            gapi.client.init({
              clientId: clientId,
              scope: ""
            })
          }
      
          gapi.load('client:auth2', start)

        const validarToken = async () => {
            const storageToken = localStorage.getItem('token')
            const storageGoogle = localStorage.getItem('idGoogle')
            if (storageGoogle && storageToken) {
                const data = await validateGoogle(storageToken)
                if (data.user_id) {
                    setColaborador(await getColaborador(storageGoogle));
                } else {
                    setColaborador({});
                }
            } else {     
                if (storageToken) {
                    const data = await validateToken(storageToken)
                    if (data.matricula) {
                        setColaborador(data);
                    } else {
                        setColaborador({});
                    }
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
    
    const signinGoogle = async (email: string, token: string, id: string, nome: string) => {
        const data = await loginOauth(email, id, nome)
        
        if (data.matricula && token) {
            setColaborador(data);
            setToken(token);
            setIdGoogle(id.slice(0,18));
            return true;
        }
        return false;
    }
    

    const signout = () => {
        setColaborador(null)
        setToken('')
        setIdGoogle('')
    }

    const setToken = (token: string) => {
        localStorage.setItem('token', token);
    }

    const setIdGoogle = (id: string) => {
        localStorage.setItem('idGoogle', id);
    }

    return (
        <AuthContext.Provider value={{colaborador, signin, signout, signinGoogle, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}