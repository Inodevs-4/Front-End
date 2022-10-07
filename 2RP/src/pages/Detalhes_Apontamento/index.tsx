import Navbar from '../../components/menu/Navbar';
import { useContext, useEffect, useState } from 'react'
import "./styles.css";
import { formatarDataHora } from "../../functions/formatar";
import { Lancamento } from '../../types/Types'
import { useNavigate, useParams } from 'react-router-dom';


export const DetalhesApontamento = () =>{

    const { id } = useParams()

    const [lancamento, setLancamento] = useState<Lancamento>()
    const [lacamentoInicial, setLacamentoIncial] = useState<Lancamento>()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/getLancamento/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setLancamento(data)
            setLacamentoIncial(data)
          })
      }, [])

      
    function handleChange(e: any) {
        setLancamento({...lancamento, [e.target.name]: e.target.value})
    }

    function handleSelect(e: any) {
        setLancamento({...lancamento, [e.target.name]: e.target.options[e.target.selectedIndex].value,})
    }
    console.log(lancamento)
    // Função para ativar inputs
    const[isDisabled, setIsDisabled] = useState(true);
    //Esconde botao alterar
    const[isHidden, setIsHidden] = useState(false);
   //Div dos botoes de concluir e cancelar
    const[isVisible, setIsVisible] = useState(true);
    const editarUsuario = () => {
        setIsDisabled(!isDisabled)
        setIsHidden(!isHidden)
        setIsVisible(!isVisible)
    }

    const history = useNavigate();

    /*
    const cancelar = () => {
        history('/editUsuario')
    }
    */

    const cancelar = () => {
        setLancamento(lacamentoInicial)
        editarUsuario()
    }

    const salvarLacamento = () => {
        fetch(`${process.env.REACT_APP_SERVER}/atualizarLancamento/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(lancamento),
          })
            .then((resp) => resp.json())
            .then((data) => {
              console.log(data)
              history('/aprovacao-lancamento')
            })
            .catch((err) => console.log(err))
    }


    return(
        <body>
            <Navbar/>
            { /* Lançamento */}
            <div className="edit">
                <h3>Lançamento</h3>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput"value={lancamento?.colaborador?.nome} disabled={isDisabled} name="nome"  />
                    <label htmlFor="floatingInputGrid">Nome</label>
                </div>
                { /* Modalidade && Tipo && 2º acionamento*/}
                <div className="row g-2">
                <div className="col-md">
                        <div className="form-floating">
                            <select  className="form-select" id="floatingInputGrid" disabled={isDisabled} value={lancamento?.modalidade}  onChange={handleChange} name="modalidade">
                            <option value="Hora_Extra">Hora Extra</option>
                            <option value="avisso">Sob avisso</option>
                            </select>
                        </div>
                    </div>  
                        
                    
                    <div className="col-md">                        
                <div className="form-floating">
                    <label className="eu" htmlFor="floatingInputGrid">Acionamento</label>
                            <select className="form-select" aria-label="Disabled select example" disabled={isDisabled} value={lancamento?.acionado} onChange={handleSelect} name="Acionamento" >
                            <option value="Nao">Não</option>
                            <option value="Sim">Sim</option>
                            </select>
                        </div>
                    </div>
                </div>
                { /* Inicio && Fim */}
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className="form-control"  disabled={isDisabled} value={formatarDataHora(String(lancamento?.data_inicio))}   onChange={handleChange} name="incio" />
                            <label htmlFor="floatingInputGrid">Inicio</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className="form-control"  disabled={isDisabled} value={formatarDataHora(String(lancamento?.data_fim))}   onChange={handleChange} name="fim"/>
                            <label htmlFor="floatingInputGrid">Fim</label>
                        </div>
                    </div>
                </div>
                { /* Inicio2 && Fim2 */}
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className="form-control"  disabled={isDisabled} value={formatarDataHora(String(lancamento?.data_inicio2))}  onChange={handleChange} name="inicio2"/>
                            <label htmlFor="floatingInputGrid">2º Inicio</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className="form-control"  disabled={isDisabled} value={formatarDataHora(String(lancamento?.data_fim2))}  onChange={handleChange} name="fim2"/>
                            <label htmlFor="floatingInputGrid">2º Fim</label>
                        </div>
                    </div>
                </div>
                { /* Projeto && Gestor */}
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <select  className="form-select" id="floatingInputGrid" disabled={isDisabled} value={lancamento?.projeto?.nome}  onChange={handleSelect} name="projeto" >
                            <option value="Projeto_1">Projeto</option>
                            <option value="Projeto_2">Projeto 2</option>
                            <option value="Projeto_3">Projeto 3</option>
                            </select>
                           
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <select  className="form-select" id="floatingInputGrid" disabled={isDisabled} defaultValue="Gestor 1"  onChange={handleSelect} name="gestor">
                            <option value="Gestor_1">Gestor 1</option>
                            <option value="Gestor_2">Gestor 2</option>
                            </select>
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

                    <button onClick={editarUsuario}  className='btn btn-primary editar' hidden={isHidden}>Editar</button>
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