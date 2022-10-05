import * as C from './styles';
import { Theme } from '../../../components/Theme';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, FormActions } from '../../../contexts/FormContext';
import { ChangeEvent, useEffect, useState } from 'react';
import { Colaborador } from '../../../types/Types'
import Navbar from '../../../components/menu/Navbar';
// import Menu from "../../../components/menu";



export const Etapa2Form = () => {

    const history = useNavigate();
    const { state, dispatch } = useForm();

    const [ colaboradores, setColaboradores ] = useState<Colaborador[]>([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/selectColaboradores`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setColaboradores(data)
          })
      }, [])

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

    const handleDateStarts2Change = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormActions.setDataInicio2,
            payload: e.target.value
        })
    }

    const handleDateEnds2Change = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormActions.setDataFim2,
            payload: e.target.value
        })
    }

    const handleAcionadoChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: FormActions.setAcionado,
            payload: e.target.value 
        });
        console.log(state.acionado)
    }

    const handleColaboratorChange = (e: ChangeEvent<HTMLSelectElement>) => {
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
<div>
<Navbar/>
    <Theme>
            <C.Container>
                <h4>Passo 2/3</h4>
                <p>Defina  a data de inicio e fim e horário</p>
               <hr/>
                <select name="colaborador" id="colaborador" className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={handleColaboratorChange}>
                    <option disabled selected>Selecione um colaborador</option>
                    {colaboradores.map((colaborador) => (
                        <option value={colaborador.matricula} key={colaborador.matricula}>{colaborador.nome}</option>
                    ))}
                </select>
                <p>Inicio </p>
                <input type="datetime-local" name="" id="" onChange={handleDateStartsChange} value={state.data_inicio}/>
                <hr />
                <p>Fim</p>
                <input type="datetime-local" className='mb-4' name="" id=""  onChange={handleDateEndsChange} value={state.data_fim}/>
                <p>Foi acionado mais de uma vez?</p>
                    <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={handleAcionadoChange}>
                        <option value="sim" >Sim</option>
                        <option value="nao" selected >Não</option>
                    </select>
                {state.acionado === 'sim'  && (
                    <>
                        <p>2º Inicio</p>
                        <input type="datetime-local" name="" id="" onChange={handleDateStarts2Change} value={state.data_inicio2}/>
                        <p>2º Fim</p>
                        <input type="datetime-local" className='mb-4' name="" id=""  onChange={handleDateEnds2Change} value={state.data_fim2}/> 
                    </>
                )}
                <Link to="/etapa1" className='backButton'>Voltar</Link>

                <button onClick={handleNextStep}> Próximo </button>

            </C.Container>
        </Theme>
</div>
    )
} 

