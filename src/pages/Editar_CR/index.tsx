import Navbar from '../../components/menu/Navbar';
import { useEffect, useState } from 'react'
import "./EditarCR.css";
import { CR, Colaborador } from '../../types/Types'
import {  useParams } from 'react-router-dom';
import { atualizarCR, getCR } from '../../hooks/CR';
import { selectColaboradores } from '../../hooks/Colaborador';
export const Editar_Crs = () =>{

    const { numero } = useParams()
    const [cr, setCrs] = useState<CR>()
    const [crInicial, setCrsInicial] = useState<CR>()
    const [colaborador, setColaborador] = useState<number[]>([0,0])
    const [colaboradores, setColaboradores] = useState<Colaborador[]>()

    useEffect(() => {
        (async() => {
            const data = await getCR(numero)
            setCrs(data)
            setCrsInicial(data)
            setColaboradores(await selectColaboradores())
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
        EditarCr()
    }

    const editarCr = () => {
        atualizarCR(cr, numero)
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
                if (colaboradoresCR[i].matricula === Number(e.target.id)){
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
                <h3>Centros de resultados</h3>
                {/* {Numero && Nome} */}
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="number" className="form-control" id="floatingInputGrid" disabled value={cr?.numero} name='numero'/>
                            <label htmlFor="floatingInputGrid">Numero</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInputGrid" value={cr?.nome} disabled={isDisabled} onChange={handleChange} name='nome'/>
                        <label htmlFor="floatingInput">Nome</label>
                        </div>
                    </div>
                </div>
                {/* {Colaborador && Status} */}

                <div className="row g-2">
                    <div className="col-md">
                    <div className="form-floating">
                        <select name="colaborador" id="floatingInputGrid" className="form-select" aria-label=".form-select-lg example" disabled={isDisabled} onChange={handleSelectColaborador} value={colaborador[1]}>
                            <option value="0" disabled selected>Selecione um colaborador</option>
                            {colaboradores && 
                            (colaboradores.map((c) => (
                                <option value={c.matricula} key={c.matricula}>{c.nome}</option>
                            )
                            ))}
                        </select>
                        <label>Colaboradores</label>
                        {isHidden && <button onClick={adicionarColaborador}>Adicionar</button>}
                        {cr?.colaboradores && cr?.colaboradores.map((colaborador) => (
                            <div key={colaborador.matricula}>
                                <p>{colaborador.nome}</p>
                                {isHidden && <button id={String(colaborador.matricula)} onClick={removerColaborador}>Remover</button>}
                        </div>
                         ))}
                         </div>
                    </div>
                    <div className="col-md">        
                        <div className="form-floating">
                            <select className="form-select" aria-label="Disabled select example"  disabled={isDisabled} onChange={handleChange} name="status" >
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Inativo</option>
                            </select>
                            <label htmlFor="floatingInputGrid">Status</label>
                        </div>
                    </div>

                {/* Colaboradores */}
                <div className="row g-2">
                    {/* Botão Editar */}
                    <button onClick={EditarCr}  className='btn btn-primary editar right' hidden={isHidden}>Editar</button>
                    <div className='alteracao' hidden={isVisible}>
                        <button className='btn btn-danger' onClick={cancelar}>Cancelar</button>
                        <button onClick={editarCr} className='btn btn-success'>Concluir</button>
                    </div>
                </div> 
            </div>
        </div>
    </body>
    )
    }
    export default Editar_Crs