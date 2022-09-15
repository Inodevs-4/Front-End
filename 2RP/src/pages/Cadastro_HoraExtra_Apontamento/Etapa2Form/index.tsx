import * as C from './styles';
import { Theme } from '../../../components/Theme';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, FormActions } from '../../../contexts/FormContext';
import { ChangeEvent, useEffect } from 'react';

export const Etapa2Form = () => {

    const history = useNavigate();
    const { state, dispatch } = useForm();

    useEffect(() => {
        if(state.modalidade === ''){
            history('/');
        } else {
            dispatch({
                type: FormActions.setCurrentStep,
                payload: 2,
            });
        }

    }, []);

    const handleDateStartsChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormActions.setDataInicio,
            payload: e.target.value
        })
    }

    const handleDateEndsChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormActions.setDataFim,
            payload: e.target.value
        })
    }
    const handleColaboratorChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormActions.setColaborador,
            payload: e.target.value
        });
    }
    const handleNextStep = () => {
        if(state.data_inicio === '' || state.data_fim === ''){
            alert("Preencha todos os campos")
        }
        else {
            if(state.data_inicio === state.data_fim){
                alert("Conflito de horário!")
            }
            else{
                history('/etapa3')
            }
        }

    }

    return (
        <Theme>
            <C.Container>
                <h4>Passo 2/3</h4>
                <p>Defina  a data de inicio e fim e horário</p>
               <hr/>
               <div className="form-floating mb-3">
                    <input type="text" 
                    className="form-control" 
                    id="floatingInput4" 
                    value={state.colaborador}
                    onChange={handleColaboratorChange}
                    placeholder="Nome do Cliente"
                    />
                    <label htmlFor="floatingInput4">Nome do Colaborador</label>
                </div>
               <p>Inicio </p>
                <input type="datetime-local" name="" id="" onChange={handleDateStartsChange}/>
                <hr />
                <p>Fim </p>
                <input type="datetime-local" name="" id=""  onChange={handleDateEndsChange}/>
                <h5>.</h5>
                <Link to="/etapa1" className='backButton'>Voltar</Link>

                <button onClick={handleNextStep}> Próximo </button>

            </C.Container>
        </Theme>

    )
} 

