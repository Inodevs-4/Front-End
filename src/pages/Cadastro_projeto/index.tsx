// import Menu from "../../components/menu";
import Navbar from '../../components/menu/Navbar';
import { useState , useEffect } from 'react'
// import Calendar from 'react-calendar';
import "./styles.css";
import { Projeto , CR, Cliente} from '../../types/Types'
import { useNavigate} from 'react-router-dom';
import { salvarProjeto } from '../../hooks/Projeto';
import { getCR, todosCRs } from '../../hooks/CR';
import { todosClientes } from '../../hooks/Clientes';
export const Cadastro_Projeto = () =>{

    const [colaborador, setColaborador] = useState<Projeto>()
    const [colaboradores, setColaboradores] = useState<CR[]>()
    const [clientes, setClientes] = useState<Cliente[]>()

    useEffect(() => {
        (async() => {
            setColaboradores(await todosCRs())
        })()
    }, [])  

    useEffect(() => {
        (async() => {
            setClientes(await todosClientes())
        })()
    }, [])  



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
                            <input type="tel" className="form-control" id="floatingInputGrid" onChange={handleChange} value={colaborador?.nome} name='nome'/>
                            <label htmlFor="floatingInputGrid">Nome</label>
                        </div>
                    </div>
   
                    <div className="col-md">
                        <div className="form-floating">
                            <select  className="form-select" id="cliente" onChange={handleSelect} value={colaborador?.cliente} name="cliente">
                            {clientes && 
                        (clientes.map((c) => (
                        
                            <option value={c.cnpj} key={c.cnpj}>{c.numero}</option>
                        )))}
                            </select>
                            <label htmlFor="floatingInputGrid">Cliente</label>
                        </div>
                    </div>  
                   
   
                </div>
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <select  className="form-select" id="floatingInputGrid" onChange={handleSelect} value={colaborador?.cr} name="cr">
                            {colaboradores && 
                        (colaboradores.map((c) => (
                        
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
                           <button onClick={salvandoColaborador} className='btn btn-success'>Concluir</button>
                       </div>
            </div>
    </body>
    )
    }
    export default Cadastro_Projeto