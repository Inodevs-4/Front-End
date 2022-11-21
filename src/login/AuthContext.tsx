import { createContext } from 'react';
import { Colaborador } from '../types/Types';

export type AuthContextType = {
    colaborador: Colaborador | null;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => void;
    signinGoogle: (email: string, token: string, id: string) => Promise<boolean>;
    isLoading: boolean
}

export const AuthContext = createContext<AuthContextType>(null!);