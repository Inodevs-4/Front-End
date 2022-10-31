    // import Menu from "../../components/menu";
import Navbar from '../../components/menu/Navbar';
import { useEffect, useState } from 'react'
// import Calendar from 'react-calendar';
import "./styles.css";
import { Colaborador, CR} from '../../types/Types'
import { useNavigate} from 'react-router-dom';
import { salvarCR } from '../../hooks/CR';
import { getColaborador, selectColaboradores } from '../../hooks/Colaborador';
export const CadastroCR = () =>{
    
    const [cr, setCr] = useState<CR>({colaboradores: []})
    const [colaborador, setColaborador] = useState()
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
        setColaborador( e.target.options[e.target.selectedIndex].value)
    }

    async function adicionarColaborador(e: any){
        if (colaborador && cr?.colaboradores !== undefined){
            const colaboradoresCR = [...cr?.colaboradores]
            const getColab = await getColaborador(colaborador)
            colaboradoresCR.push(getColab)
            setCr({...cr, colaboradores: [...colaboradoresCR]})
        }
    }

    const history = useNavigate();

    const salvandoCr = () => {
        salvarCR(cr)
        console.log(cr)
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
                    <select name="colaborador" id="colaborador" className="form-select form-select-lg mb-3 mt-3" aria-label=".form-select-lg example" onChange={handleSelectColaborador}>
                        <option disabled selected>Selecione um colaborador</option>
                        {colaboradores && 
                        (colaboradores.map((c) => (
                        
                            <option value={c.matricula} key={c.matricula}>{c.nome}</option>
                        )))}
                    </select>
                    <button onClick={adicionarColaborador}>Adicionar</button>
                    {cr?.colaboradores && cr?.colaboradores.map((colaborador) => (
                        <p>{colaborador.nome}</p>
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