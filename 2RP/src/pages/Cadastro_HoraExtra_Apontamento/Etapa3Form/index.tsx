import { useNavigate, Link } from 'react-router-dom';
import * as C from './styles';
import { useForm, FormActions } from '../../../contexts/FormContext';
import { Theme } from '../../../components/Theme';
import { ChangeEvent, useEffect, useState, } from 'react';
import { Colaborador, Projeto } from '../../../types/Types';
import Navbar from '../../../components/menu/Navbar';
// import Menu from "../../../components/menu";



export const Etapa3Form = () => {
    const history = useNavigate();
    const { state, dispatch } = useForm();

    const [ projetos, setProjetos ] = useState<Projeto[]>([]);
    const [ gestores, setGestores ] = useState<Colaborador[]>([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/selectProjetos`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProjetos(data)
          })
      }, [])

      useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/selectGestores`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setGestores(data)
          })
      }, [])

    useEffect(() => {
        dispatch({
            type: FormActions.setCurrentStep,
            payload: 3
        });
    }, []);

    const handleNextStep = () => {
        if(state.projeto !== '' /*&& state.gestor !== ''*/){
            console.log(state)
            fetch(`${process.env.REACT_APP_SERVER}/salvarLancamento`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(state),
              })
                .then((resp) => resp.json())
                .then((data) => {
                  console.log(data)
                  history('/pagina-inicial')
                })
                .catch((err) => console.log(err))
            }
        else{
            alert("Preencha todos os campos")
        }
        
    }

    const handleProjectChange = (e: ChangeEvent<HTMLSelectElement>) => {
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
    
    const handleGestorChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: FormActions.setGestor,
            payload: e.target.value
        });
    }
    
    return (
        <div>
                <Navbar/>
        <Theme>

            <C.Container>
                <h4>Passo {state.currentStep}/3</h4>
                <p>Preencha o campo abaixo com seu nome completo.</p>

                <hr/>

                <select name="projeto" id="projeto" className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={handleProjectChange}>
                    <option disabled selected>Selecione um projeto</option>
                    {projetos.map((projeto) => (
                        <option value={projeto.id} key={projeto.id}>{projeto.nome}</option>
                    ))}
                </select>
                
                <div className="input-group">
                    <textarea className="form-control" aria-label="With textarea"
                    value={state.observacoes}
                    onChangeCapture={handleObsChange}
                    
                    placeholder="Observações"></textarea>
                </div>  
                <p></p>                

                <select name="gestor" id="gestor" className="form-select form-select-lg mb-3 mt-3" aria-label=".form-select-lg example" onChange={handleGestorChange}>
                    <option disabled selected>Selecione um gestor</option>
                    {gestores.map((gestor) => (
                        <option value={gestor.id} key={gestor.id}>{gestor.nome}</option>
                    ))}
                </select>

                <Link to="/etapa2" className='backButton'>Voltar</Link>

                <button onClick={handleNextStep}>Concluir</button>
            </C.Container>
        </Theme>
        </div>
    );
}