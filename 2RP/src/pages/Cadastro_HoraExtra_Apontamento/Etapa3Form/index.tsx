import { useNavigate, Link } from 'react-router-dom';
import * as C from './styles';
import { useForm, FormActions } from '../../../contexts/FormContext';
import { Theme } from '../../../components/Theme';
import { ChangeEvent, useEffect, } from 'react';

export const Etapa3Form = () => {
    const history = useNavigate();
    const { state, dispatch } = useForm();

    useEffect(() => {
        dispatch({
            type: FormActions.setCurrentStep,
            payload: 3
        });
    }, []);

    const handleNextStep = () => {
        if(state.projeto !== '' && state.gestor !== ''){
            console.log(state);
        }
        else{
            alert("Preencha todos os campos")
        }
        
    }

    const handleProjectChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormActions.setProjeto,
            payload: e.target.value
        });
    }
    
    const handleObsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({
            type: FormActions.setObservacoes,
            payload: e.target.value
        });
    }
    
    const handleGestorChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormActions.setGestor,
            payload: e.target.value
        });
    }

    return (
        <Theme>
            <C.Container>
                <h4>Passo {state.currentStep}/3</h4>
                <p>Preencha o campo abaixo com seu nome completo.</p>

                <hr/>

                
                <div className="form-floating mb-3">
                    <input type="text" 
                    className="form-control" 
                    id="floatingInput" 
                    value={state.projeto}
                    onChange={handleProjectChange}
                    placeholder="Nome do Projeto"
                    />
                    <label htmlFor="floatingInput">Nome do Projeto</label>
                </div>
                
                <div className="input-group">
                    <textarea className="form-control" aria-label="With textarea"
                    value={state.observacoes}
                    onChangeCapture={handleObsChange}
                    
                    placeholder="Observações"></textarea>
                </div>  
                <p></p>
                <div className="form-floating mb-3">
                    <input type="text" 
                    className="form-control" 
                    id="floatingInput3" 
                    value={state.gestor}
                    onChange={handleGestorChange}
                    placeholder="Nome do Gestor"
                    />
                    <label htmlFor="floatingInput3">Nome do Gestor</label>
                </div>
                <Link to="/etapa2" className='backButton'>Voltar</Link>

                <button onClick={handleNextStep}>Concluir</button>
            </C.Container>
        </Theme>
    );
}