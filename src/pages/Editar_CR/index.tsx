import Navbar from '../../components/menu/Navbar';
import { useEffect, useState } from 'react'
import "./EditarCR.css";
import { CR, Colaborador } from '../../types/Types'
import {  useParams } from 'react-router-dom';
import { atualizarCR, getCR, selectColaboradoresCr } from '../../hooks/CR';
export const Editar_Crs = () =>{

    const { numero } = useParams()
    const [cr, setCrs] = useState<CR>()
    const [crInicial, setCrsInicial] = useState<CR>()
    const [colaborador, setColaborador] = useState<number[]>([0,0])
    const [colaboradores, setColaboradores] = useState<Colaborador[]>()
    const [colaboradoresInicial, setColaboradoresInicial] = useState<Colaborador[]>()

    useEffect(() => {
        (async() => {
            const dataCR = await getCR(numero)
            setCrs(dataCR)
            setCrsInicial(dataCR)
            const dataColaboradores = await selectColaboradoresCr(String(numero))
            setColaboradores(dataColaboradores)
            setColaboradoresInicial(dataColaboradores)
        })()
    }, [])

    function handleChange(e: any) {
        setCrs({...cr, [e.target.name]: e.target.value})
    }

    function handleSelect(e: any) {
        setCrs({...cr, [e.target.name]: e.target.options[e.target.selectedIndex].value,})
    }

    // Função para ativar inputs
    const[isDisabled, setIsDisabled] = useState(true);
    //Esconde botao alterar
    const[isHidden, setIsHidden] = useState(false);
   //Div dos botoes de concluir e cancelar
    const[isVisible, setIsVisible] = useState(true);
    const EditarCr = () => {
        setIsDisabled(!isDisabled)
        setIsHidden(!isHidden)
        setIsVisible(!isVisible)
    }

    //const history = useNavigate();

    /*
    const cancelar = () => {
        history('/editUsuario')
    }
    */

    const cancelar = () => {
        setCrs(crInicial)
        setColaboradores(colaboradoresInicial)
        EditarCr()
    }

    const editarCr = () => {
        atualizarCR(cr, numero)
        console.log(cr)
        /*setCrsInicial(colaborador)*/
        EditarCr()
    }

    /* Editar colaboradores CR*/
    function handleSelectColaborador(e: any) {
        setColaborador([e.target.options[e.target.selectedIndex].index, e.target.options[e.target.selectedIndex].value])
    }

    function adicionarColaborador(){
        if (colaborador[1] !== 0 && cr?.colaboradores !== undefined && colaboradores){
            const colaboradoresCR = [...cr?.colaboradores]
            const getColab = colaboradores[colaborador[0]-1]
            colaboradoresCR.push(getColab)
            setCrs({...cr, colaboradores: [...colaboradoresCR]})

            const colaboradoresSelect = [...colaboradores]
            colaboradoresSelect.splice(colaborador[0]-1, 1)
            setColaboradores(colaboradoresSelect)
            setColaborador([0, 0])
        }
    }

    function removerColaborador(e: any) {
        if (cr?.colaboradores !== undefined && colaboradores !== undefined){
            const colaboradoresCR = [...cr?.colaboradores]
            for (var i=0; i < colaboradoresCR.length; i++){
                if (colaboradoresCR[i].matricula === e.target.id){
                    const colaboradoresSelect = [...colaboradores]
                    colaboradoresSelect.push(colaboradoresCR[i])
                    setColaboradores(colaboradoresSelect)

                    colaboradoresCR.splice(i, 1)
                    setCrs({...cr, colaboradores: colaboradoresCR})
                    break
                }
            }
        } 
    }

    return(
    <body>
        <Navbar/>
        <div className="edit">
                <h3>Centros de Resultados</h3>
                {/* {Numero && Nome} */}
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="number" className="form-control" id="floatingInputGrid" disabled value={cr?.numero} name='numero'/>
                            <label htmlFor="floatingInputGrid">Numero</label>
                        </div>
                    </div>
                    <div className="col-md"></div>
                </div>
                {/* {Colaborador && Status} */}

                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInputGrid" value={cr?.nome} disabled={isDisabled} onChange={handleChange} name='nome'/>
                        <label htmlFor="floatingInput">Nome</label>
                        </div>
                    </div>
                    <div className="col-md">        
                        <div className="form-floating">
                            <select className="form-select" aria-label="Disabled select example"  disabled={isDisabled} onChange={handleSelect} name="status" value={cr?.status}>
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Inativo</option>
                            </select>
                            <label htmlFor="floatingInputGrid">Status</label>
                        </div>
                    </div>
                </div>

                <h5 className="colab">Colaboradores:</h5>
                        {(!isHidden && cr?.colaboradores && cr?.colaboradores.length === 0) && <p className="texto">Não há colaboradores neste Centro de Resultado.</p>}
                        {cr?.colaboradores && cr?.colaboradores.map((colaborador, index) => (
                            <>
                            {index % 2 === 0 ? (
                            <div className="left">
                                <div key={colaborador.matricula} className="col-md">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floatingInputGrid" disabled value={colaborador.nome} name='colaborador'/>
                                        {isHidden && <button className="remover" id={String(colaborador.matricula)} onClick={removerColaborador}>&#8212;</button>}
                                    </div>  
                                </div>
                            </div>) : 
                            (
                            <div className="right">
                              <div key={colaborador.matricula} className="col-md">
                              <div className="form-floating">
                                  <input type="text" className="form-control" id="floatingInputGrid" disabled value={colaborador.nome} name='colaborador'/>
                                  {isHidden && <button className="remover" id={String(colaborador.matricula)} onClick={removerColaborador}>&#8212;</button>}
                              </div>  
                            </div>  
                            </div>
                            )}
                            </>
                    ))}

                        {isHidden && (
                            <>
                            {cr?.colaboradores && cr?.colaboradores.length % 2 === 0 ? (
                                <div className='left'>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <select name="colaborador" id="floatingInputGrid" className="form-select" aria-label=".form-select-lg example" onChange={handleSelectColaborador} value={colaborador[1]}>
                                                <option value="0" disabled selected>Selecione um colaborador</option>
                                                {colaboradores && 
                                                (colaboradores.map((c) => (
                                                    <option value={c.matricula} key={c.matricula}>{c.nome}</option>
                                                )
                                            ))}
                                            </select>
                                            <label>Novo colaborador</label>
                                            <button className="adicionar" onClick={adicionarColaborador}>+</button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className='right'>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <select name="colaborador" id="floatingInputGrid" className="form-select" aria-label=".form-select-lg example" onChange={handleSelectColaborador} value={colaborador[1]}>
                                                <option value="0" disabled selected>Selecione um colaborador</option>
                                                {colaboradores && 
                                                (colaboradores.map((c) => (
                                                    <option value={c.matricula} key={c.matricula}>{c.nome}</option>
                                                )
                                            ))}
                                            </select>
                                            <label>Novo colaborador</label>
                                            <button className="adicionar" onClick={adicionarColaborador}>+</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </>
                        )}
                         
                {/* Colaboradores */}
                <div className="row g-2">
                    {/* Botão Editar */}
                    <button onClick={EditarCr}  className='btn btn-primary editar' hidden={isHidden}>Editar</button>
                    <div className='alteracao' hidden={isVisible}>
                        <button className='btn btn-danger' onClick={cancelar}>Cancelar</button>
                        <button onClick={editarCr} className='btn btn-success'>Concluir</button>
                    </div>
                </div> 
            </div>
    </body>
    )
    }
    export default Editar_Crs