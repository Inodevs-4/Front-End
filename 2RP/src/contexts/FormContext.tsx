// Context, Reducer, Provider, Hook
import { createContext, ReactNode, useContext, useReducer } from 'react'

type State = {
    currentStep: number;
    modalidade: string;
    level: 0 | 1 | 2;
    gestor: string;
    data_inicio: string;
    data_fim: string; 
    cliente: string;
    projeto: string;
}

type Action = {
    type: FormActions;
    payload: any;
}

type ContextType = {
    state: State;
    dispatch: (action: Action) => void;
}

type FormProviderProps = {
    children: ReactNode
}

const initialData: State = {
    currentStep: 0,
    modalidade: '',
    level: 0,
    gestor: '',
    data_inicio: '',
    data_fim: '',
    cliente: '',
    projeto: ''
}

//Context
const FormContext = createContext<ContextType | undefined>(undefined);

//Reducer
export enum FormActions {
    setCurrentStep,
    setModalidade,
    setLevel,
    setGestor,
    setDataInicio,
    setDataFim,
    setCliente,
    setProjeto
}

const formReducer = (state: State, action: Action) => {
    switch (action.type) {
        case FormActions.setCurrentStep:
            return{...state, currentStep: action.payload };
        case FormActions.setModalidade:
            return{...state, modalidade: action.payload };
        case FormActions.setLevel:
            return{...state, level: action.payload };
        case FormActions.setGestor:
            return{...state, gestor: action.payload };
        case FormActions.setDataInicio:
            return{...state, data_inicio: action.payload };
        case FormActions.setDataFim:
            return{...state, data_fim: action.payload };
        case FormActions.setCliente:
            return{...state, cliente: action.payload};
        case FormActions.setProjeto:
            return{...state, projeto: action.payload};
        default:
            return state;
    }

}

//Provider

export const FormProvider = ({children}:FormProviderProps) => {
    const[state,dispatch] = useReducer(formReducer, initialData);

    const value = {state,dispatch}
    return(
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    )
}
 //37:07

//Context Hook
export const useForm = () => {
    const context = useContext(FormContext)
    if(context === undefined) {
        throw new Error('useForm precisa ser usado dentro do FormProvider');
    }
    return context;
}