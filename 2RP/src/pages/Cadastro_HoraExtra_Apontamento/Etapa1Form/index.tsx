import * as C from './styles';
import { Theme } from '../../../components/Theme';
import { useNavigate } from 'react-router-dom';
import { useForm, FormActions } from '../../../contexts/FormContext';
import { ChangeEvent, useEffect } from 'react';


export const Etapa1Form = () => {

    const history = useNavigate();
    const { state, dispatch } = useForm();

    useEffect(() => {
        dispatch({
            type: FormActions.setCurrentStep,
            payload: 1,
        });
    }, []);

    const handleModalidadeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: FormActions.setModalidade,
            payload: e.target.value 
        });
    }

    const handleNextStep = () => {

        if (state.modalidade !== '') {
            history('/etapa2')
        }
        else {
            alert("Selecione a modalidade");
        }
    }


    return (
        <Theme>
            <C.Container>
                <h4>Passo {state.currentStep}/3</h4>
                <h1>Modalidade: </h1>
                <p> {state.modalidade === '' ? 'A definir': `${state.modalidade}`}</p>
            <hr/>
            {/* <h1>{ state.modalidade }</h1> */}
            <p></p>
            <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={handleModalidadeChange}>
                <option selected disabled >Selecione a modalidade</option>
                <option value="Hora extra" >Hora Extra</option>
                <option value="Sobreaviso" >Sobreaviso</option>
            </select>
                <button onClick={handleNextStep}> Próximo </button>
            </C.Container>
        </Theme>

    )
} 

export default Etapa1Form
