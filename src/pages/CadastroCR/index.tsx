    // import Menu from "../../components/menu";
import Navbar from '../../components/menu/Navbar';
import { useEffect, useState } from 'react'
// import Calendar from 'react-calendar';
import "./styles.css";
import { Colaborador, CR} from '../../types/Types'
import { useNavigate} from 'react-router-dom';
import { salvarCR } from '../../hooks/CR';
import { selectColaboradores } from '../../hooks/Colaborador';
export const CadastroCR = () =>{
    
    const [cr, setCr] = useState<CR>({colaboradores: []})
    const [colaborador, setColaborador] = useState<number[]>([0,0])
    const [colaboradores, setColaboradores] = useState<Colaborador[]>()

    useEffect(() => {
        (async() => {
            setColaboradores(await selectColaboradores())
        })()
    }, [])
      
    function handleChange(e: any) {
        setCr({...cr, [e.target.name]: e.target.value})
    }

    function handleSelectColaborador(e: any) {
        setColaborador([e.target.options[e.target.selectedIndex].index, e.target.options[e.target.selectedIndex].value])
    }

    function adicionarColaborador(){
        if (colaborador[1] !== 0 && cr?.colaboradores !== undefined && colaboradores){
            const colaboradoresCR = [...cr?.colaboradores]
            const getColab = colaboradores[colaborador[0]-1]
            colaboradoresCR.push(getColab)
            setCr({...cr, colaboradores: [...colaboradoresCR]})

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
                    setCr({...cr, colaboradores: colaboradoresCR})
                    break
                }
            }
        } 
    }


    const history = useNavigate();

    const salvandoCr = () => {
        salvarCR(cr)
        history('/tabela-crs')
    }

    return(
    <body>
        <Navbar/>
        <div className="edit">
            <h3>Centro de Resultados</h3>
            {/* Matricula && Perfil */}
            <div className="row g-2">
                <div className="col-md">
                    <div className="form-floating">
                    <input type="text" className="form-control numero" id="floatingInputGrid numero" value={cr?.numero} name='numero' onChange={handleChange} />
                    <label htmlFor="floatingInputGrid">Número</label>
                    </div>
                </div>
            </div>
            {/* Nome */}
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" value={cr?.nome} onChange={handleChange} name='nome'/>
                <label htmlFor="floatingInput">Nome</label>
            </div>
            <div className="form-floating mb-3">
                    <select name="colaborador" id="colaborador" className="form-select form-select-lg mb-3 mt-3" aria-label=".form-select-lg example" onChange={handleSelectColaborador} value={colaborador[1]}>
                        <option value="0" disabled selected>Selecione um colaborador</option>
                        {colaboradores && 
                        (colaboradores.map((c) => (
                            <option value={c.matricula} key={c.matricula}>{c.nome}</option>
                        )
                        ))}
                    </select>
                    <label>Colaboradores</label>
                    <button onClick={adicionarColaborador}>Adicionar</button>
                    {cr?.colaboradores && cr?.colaboradores.map((colaborador) => (
                        <div key={colaborador.matricula}>
                            <p>{colaborador.nome}</p>
                            <button id={String(colaborador.matricula)} onClick={removerColaborador}>Remover</button>
                        </div>
                    ))}
                </div>
            <hr className='linha'/>
            {/* Botão Cadastrar */}
            <button onClick={salvandoCr}  className='btn btn-primary cadastrar1'>Cadastrar</button>
        </div>
    </body>
    )
    }
    export default CadastroCR