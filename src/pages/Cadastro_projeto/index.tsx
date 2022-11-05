import Navbar from '../../components/menu/Navbar';
import { useState , useEffect } from 'react'
import "./styled.css";
import { Projeto , CR, Cliente} from '../../types/Types'
import { useNavigate} from 'react-router-dom';
import { salvarProjeto } from '../../hooks/Projeto';
import { todosCRs } from '../../hooks/CR';
import { todosClientes } from '../../hooks/Clientes';

export const Cadastro_Projeto = () =>{

    const [colaborador, setColaborador] = useState<Projeto>()
    const [cr, setCr] = useState<CR[]>()
    const [clientes, setClientes] = useState<Cliente[]>()
    const[isDisabled] = useState(true);

    useEffect(() => {
        (async() => {
            setCr(await todosCRs())
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
        history('/projetos')

    }

    return(
        <body >
        <Navbar/>
        <div className="edit">
                <h3>Cadastro de Projetos</h3>
               <div className="row g-2">
                        <div className="form-floating">
                            <input type="tel" className="form-control" id="floatingInputGrid" onChange={handleChange} value={colaborador?.nome} name='nome'/>
                            <label htmlFor="floatingInputGrid">Nome</label>
                    </div>
   
                </div>
                <div className="row g-2">
                <div className="col-md">
                        <div className="form-floating">
                            <select  className="form-select" id="cr" onChange={handleSelect}  value={colaborador?.cr} name="cr">
                            <option value="0" disabled selected>Selecione um centro de resultado</option>
                            {cr && 
                        (cr.map((c) => (
                        
                            <option value={c.numero} key={c.numero}>{c.nome}</option>
                        )))}
                            </select>
                            <label htmlFor="floatingInputGrid">Centro de Resultado</label>
                        </div>
                    </div>   
                       
                   
                    <div className="col-md">                        
                <div className="form-floating">
                <select  className="form-select" id="cliente" onChange={handleSelect}  value={colaborador?.cliente} name="cliente">
                        <option value="0" disabled selected>Selecione um cliente</option>
                        {clientes && 
                        (clientes.map((c) => (
                            
                            <option value={c.cnpj} key={c.cnpj}>{c.nome}</option>
                        )))}
                            </select>
                            <label htmlFor="floatingInputGrid">Cliente</label>
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