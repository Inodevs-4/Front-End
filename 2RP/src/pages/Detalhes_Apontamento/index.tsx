import Navbar from '../../components/menu/Navbar';
import { useEffect, useState } from 'react'
import "./styles.css";
import { formatarDataHoraInput } from "../../functions/formatar";
import { Colaborador, Lancamento, Projeto, Status } from '../../types/Types'
import { useNavigate, useParams } from 'react-router-dom';
import { aprovarLancamento, atualizarLancamento, getLancamento, reprovarLancamento } from '../../hooks/Lancamento';
import { selectProjetos } from '../../hooks/Projeto';
import { selectColaboradores, selectGestores } from '../../hooks/Colaborador';


export const DetalhesApontamento = () =>{

    const { id } = useParams()

    const [lancamento, setLancamento] = useState<Lancamento>()
    const [lacamentoInicial, setLacamentoIncial] = useState<Lancamento>()
    const [projetos, setProjetos] = useState<Projeto[]>([])
    const [gestores, setGestores] = useState<Colaborador[]>([])
    const [colaboradores, setColaboradores] = useState<Colaborador[]>([])

    // selecionando lancamento por id
    useEffect(() => {
        const hookLancamento = async() => {
            const data = await getLancamento(id)
            setLancamento(data)
            setLacamentoIncial(data)
        }
        hookLancamento()
      }, [])

      // selecionando todos os projetos para o select
      useEffect(() => {
        const hookProjeto = async() => {
            setProjetos(await selectProjetos())
        } 
        hookProjeto()
      }, [])

      // selecionando todos os gestores para o select
      useEffect(() => {
        const hookGestor = async() => {
            setGestores(await selectGestores())
        } 
        hookGestor()
      }, [])

      // selecionando todos os colaboradores para o select
      useEffect(() => {
        const hookColaborador = async() => {
            setColaboradores(await selectColaboradores())
        }   
        hookColaborador()
      }, [])

      
    function handleChange(e: any) {
        setLancamento({...lancamento, [e.target.name]: e.target.value})
    }

    function handleSelect(e: any) {
        setLancamento({...lancamento, [e.target.name]: e.target.options[e.target.selectedIndex].value,})
    }

    const history = useNavigate();
    // Função para ativar inputs
    const[isDisabled, setIsDisabled] = useState(true);
    //Esconde botao alterar
    const[isHidden, setIsHidden] = useState(false);
   //Div dos botoes de concluir e cancelar
    const[isVisible, setIsVisible] = useState(true);
    const editarLancamento = () => {
        setIsDisabled(!isDisabled)
        setIsHidden(!isHidden)
        setIsVisible(!isVisible)
    }

    const aprovar = async() => {
        await aprovarLancamento(lancamento, id)
        history("/aprovacao-lancamento") 
    }

    const reprovar = async() => {
        await reprovarLancamento(lancamento, id)
        history("/aprovacao-lancamento") 
    }

    /*
    const cancelar = () => {
        history('/editUsuario')
    }
    */

    const cancelar = () => {
        setLancamento(lacamentoInicial)
        editarLancamento()
    }

    const salvarLacamento = async() => {
        await atualizarLancamento(lancamento, id)
        setLacamentoIncial(lancamento)
        editarLancamento()
    }

    return(
        <body>
            <Navbar/>
            { /* Lançamento */}
            <div className="edit">
                <h3>Lançamento</h3>

  
                <div className="form-floating mb-3">
                    <select  className="form-select" id="floatingInputGrid" disabled={isDisabled} value={lancamento?.colaborador?.matricula} onChange={handleSelect} name="colaborador">
                    {colaboradores.map((colaborador) => (
                        <option value={colaborador.matricula} key={colaborador.matricula}>{colaborador.nome}</option>
                    ))}
                    </select>
                    <label htmlFor="floatingInputGrid">Nome do Colaborador</label>
                </div>
                { /* Modalidade && Tipo && 2º acionamento*/}
                <div className="row g-2">
                <div className="col-md">
                        <div className="form-floating">
                            <select  className="form-select" id="floatingInputGrid" disabled={isDisabled} value={lancamento?.modalidade}  onChange={handleChange} name="modalidade">
                            <option value="hora extra">Hora Extra</option>
                            <option value="sobreaviso">Sobreaviso</option>
                            </select>
                            <label htmlFor="floatingInputGrid">Modalidade</label>
                        </div>
                    </div>  
                        
                    
                    <div className="col-md">                        
                <div className="form-floating">
                            <select className="form-select" aria-label="Disabled select example" disabled={isDisabled} value={lancamento?.acionado} onChange={handleSelect} name="acionado" >
                            <option value="nao">Não</option>
                            <option value="sim">Sim</option>
                            </select>
                            <label htmlFor="floatingInputGrid">Foi acionado mais de uma vez?</label>
                        </div>
                    </div>
                </div>
                { /* Inicio && Fim */}
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="datetime-local" className="form-control"  disabled={isDisabled} value={formatarDataHoraInput(String(lancamento?.data_inicio))}   onChange={handleChange} name="data_inicio" />
                            <label htmlFor="floatingInputGrid">Data de Inicio</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="datetime-local" className="form-control"  disabled={isDisabled} value={formatarDataHoraInput(String(lancamento?.data_fim))}   onChange={handleChange} name="data_fim"/>
                            <label htmlFor="floatingInputGrid">Data de Fim</label>
                        </div>
                    </div>
                </div>
                { /* Inicio2 && Fim2 */}
                {lancamento?.acionado === "sim" && (
                    <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="datetime-local" className="form-control"  disabled={isDisabled} value={formatarDataHoraInput(String(lancamento?.data_inicio2))}  onChange={handleChange} name="data_inicio2"/>
                            <label htmlFor="floatingInputGrid">Data de 2º Inicio</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="datetime-local" className="form-control"  disabled={isDisabled} value={formatarDataHoraInput(String(lancamento?.data_fim2))}  onChange={handleChange} name="data_fim2"/>
                            <label htmlFor="floatingInputGrid">Data de 2º Fim</label>
                        </div>
                    </div>
                </div>
                )}
                { /* Projeto && Gestor */}
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <select className="form-select" id="floatingInputGrid" disabled={isDisabled} value={lancamento?.projeto?.id}  onChange={handleSelect} name="projeto" >
                            {projetos.map((projeto) => (
                                <option value={projeto.id} key={projeto.id}>{projeto.nome}</option>
                             ))}
                             </select>
                            <label htmlFor="floatingInputGrid">Projeto</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <select className="form-select" id="floatingInputGrid" disabled={isDisabled} value={lancamento?.gestor?.matricula} onChange={handleSelect} name="gestor">
                            {gestores.map((gestor) => (
                                <option value={gestor.matricula} key={gestor.matricula}>{gestor.nome}</option>
                             ))}
                            </select>
                            <label htmlFor="floatingInputGrid">Gestor</label>
                        </div>
                    </div>
                </div>
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInputGrid" disabled={isDisabled} value={lancamento?.observacoes} onChange={handleChange} name="observacoes"/>
                            <label htmlFor="floatingInputGrid">Observação</label>
                        </div>
                    </div>


                    <hr className='linha'/>

                    <button onClick={aprovar}  className='btn btn-success editar' hidden={isHidden}>Aprovar</button>
                    <button onClick={editarLancamento}  className='btn btn-primary editar' hidden={isHidden}>Editar</button>
                    <button onClick={reprovar}  className='btn btn-danger editar' hidden={isHidden}>Reprovar</button>
                    <div className='alteracao' hidden={isVisible}>
                        <button className='btn btn-danger' onClick={cancelar}>Cancelar</button>
                        <button onClick={salvarLacamento} className='btn btn-success'>Concluir</button>
                    </div>
                </div>
            </div>
        </body>
    )
}
export default DetalhesApontamento;