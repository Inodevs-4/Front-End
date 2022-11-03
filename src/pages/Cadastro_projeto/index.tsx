// import Menu from "../../components/menu";
import Navbar from '../../components/menu/Navbar';
import { useState , useEffect } from 'react'
// import Calendar from 'react-calendar';
import "./styled.css";
import { Projeto , CR, Cliente} from '../../types/Types'
import { useNavigate} from 'react-router-dom';
import { salvarProjeto } from '../../hooks/Projeto';
import { todosCRs } from '../../hooks/CR';
import { todosClientes } from '../../hooks/Clientes';

export const Cadastro_Projeto = () =>{

    const [colaborador, setColaborador] = useState<Projeto>()
    const [cr, setCr] = useState<CR[]>()
    // const [clientes, setClientes] = useState<Cliente[]>()
    const[isDisabled] = useState(true);

    useEffect(() => {
        (async() => {
            setCr(await todosCRs())
        })()
    }, [])  

    // useEffect(() => {
    //     (async() => {
    //         setClientes(await todosClientes())
    //     })()
    // }, [])  



    function handleChange(e: any) {
        setColaborador({...colaborador, [e.target.name]: e.target.value})
    }

    function handleSelect(e: any) {
        setColaborador({...colaborador, [e.target.name]: e.target.options[e.target.selectedIndex].value,})
    }

    const history = useNavigate();

    const salvandoColaborador = () => {
        salvarProjeto(colaborador)
        history('/tabela_Projeto')

    }

    return(
        <body >
        <Navbar/>
        <div className="edit">
                <h3>Cadastro Projetos</h3>
               <div className="row g-2">
                <div className="col-md">
                        <div className="form-floating">
                            <input type="tel" className="form-control nome" id="floatingInputGrid" onChange={handleChange} value={colaborador?.nome} name='nome'/>
                            <label htmlFor="floatingInputGrid">Nome</label>
                        </div>
                    </div>
   
                    <div className="col-md">
                     <div className="form-floating">
                         <input type="tel" className="form-select" id="floatingInputGrid" onChange={handleChange} disabled={isDisabled} value={colaborador?.cliente} name='cliente'/>
                         <label htmlFor="floatingInputGrid">Cliente</label>
                     </div>
                 </div>
                   
   
                </div>
                <div className="row g-2">
                <div className="col-md">
                        <div className="form-floating">
                            <select  className="form-select" id="cliente" onChange={handleSelect}  value={colaborador?.cliente} name="cliente">
                            {cr && 
                        (cr.map((c) => (
                        
                            <option value={c.numero} key={c.numero}>{c.nome}</option>
                        )))}
                            </select>
                            <label htmlFor="floatingInputGrid">CR</label>
                        </div>
                    </div>   
                       
                   
                    <div className="col-md">                        
                <div className="form-floating">
                            <select className="form-select" aria-label="Disabled select example"  onChange={handleSelect} value={colaborador?.status} name="status" >
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                            </select>
                            <label htmlFor="floatingInputGrid">Status</label>
                        </div>
                    </div>
                </div>
   
              
                    <hr className='linha'/>
                       <div className='alteracao' >
                           <button onClick={salvandoColaborador} className='btn btn-success'>Cadastrar</button>
                       </div>
            </div>
    </body>
    )
    }
    export default Cadastro_Projeto