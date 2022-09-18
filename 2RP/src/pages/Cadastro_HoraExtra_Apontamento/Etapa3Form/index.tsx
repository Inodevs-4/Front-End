import { useNavigate, Link, useLocation } from 'react-router-dom';
import * as C from './styles';
import { useForm, FormActions } from '../../../contexts/FormContext';
import { Theme } from '../../../components/Theme';
import { ChangeEvent, useEffect, useState, } from 'react';
import { Colaborador, Projeto } from '../../../types/Types';
import Menu from "../../../components/menu";



export const Etapa3Form = () => {
    const history = useNavigate();
    const { state, dispatch } = useForm();

    const location: any = useLocation()

    const [ projetos, setProjetos ] = useState<Projeto[]>([]);
    const [ colaborador, setColaborador ] = useState<Colaborador>({});

    useEffect(() => {
        fetch('http://localhost:5000/selectProjetos', {
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
        fetch(`http://localhost:5000/getColaborador/${state.colaborador}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setColaborador(data)
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
            fetch('http://localhost:5000/salvarLancamento', {
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
    
    const handleGestorChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormActions.setGestor,
            payload: e.target.value
        });
    }
    
    return (
        <div>
                <Menu/>
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
                <div className="form-floating mb-3 mt-3">
                    <input type="text" 
                    disabled
                    className="form-control" 
                    id="floatingInput3" 
                    value={colaborador.gestor?.nome}
                    onChange={handleGestorChange}
                    placeholder="Nome do Gestor"
                    />
                    <label htmlFor="floatingInput3">Nome do Gestor</label>
                </div>
                <Link to="/etapa2" className='backButton'>Voltar</Link>

                <button onClick={handleNextStep}>Concluir</button>
            </C.Container>
        </Theme>
        </div>
    );
}