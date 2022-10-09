import { ReactNode } from 'react';
import { Header } from '../Header';
import SidebarItem from '../SidebarItem';
import * as C from  './styles';
import { useForm } from '../../contexts/FormContext';



type Props = {
    children: ReactNode;
}

export const Theme = ({children}: Props) => {

    const { state } = useForm();
    return (
        <C.Container>
            <C.Area>
                <Header/>
                <C.Steps>
                    <C.Sidebar>
                        <SidebarItem 
                        title="Modalidade"
                        description="Definir modalidade"
                        icon="suitcase"
                        path="/etapa1"
                        active={state.currentStep === 1}
                         
                        />
                        <SidebarItem 
                        title="Horario"
                        description="Informações do colabordor"
                        icon="calendar"
                        path="/etapa2"
                        active={state.currentStep === 2}
                        />
                        <SidebarItem 
                        title="Descricao"
                        description="informações para aprovação"
                        icon="people"
                        path="/etapa3"
                        active={state.currentStep === 3}

                        />
                    </C.Sidebar>
                    <C.Page>
                        {children}
                    </C.Page>    
                </C.Steps>     
            </C.Area>
        </C.Container>
    )
}