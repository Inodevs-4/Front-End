import Navbar from '../../components/menu/Navbar';
import { useState  } from 'react'
import "./styles.css";
import {  Cliente} from '../../types/Types'
import { useNavigate} from 'react-router-dom';
import { salvarCliente} from '../../hooks/Clientes';

export const Cadastro_Clientes = () =>{

    const [colaborador, setColaborador] = useState<Cliente>()



    function handleChange(e: any) {
        setColaborador({...colaborador, [e.target.name]: e.target.value})
    }

    function handleSelect(e: any) {
        setColaborador({...colaborador, [e.target.name]: e.target.options[e.target.selectedIndex].value,})
    }

    const history = useNavigate();

    const salvandoColaborador = () => {
        salvarCliente(colaborador)
        history('/tabela-clientes')

    }

    return(
        <body >
        <Navbar/>
        <div className="edit">
                <h3>Cadastro Clientes</h3>
               <div className="row g-2">
                <div className="col-md">
                        <div className="form-floating">
                            <input type="tel" className="form-control" id="floatingInputGrid" onChange={handleChange} value={colaborador?.nome} name='nome'/>
                            <label htmlFor="floatingInputGrid">Nome</label>
                        </div>
                    </div>
   
                    <div className="col-md">
                    <div className="form-floating">
                            <input type="number" className="form-control" id="floatingInputGrid" onChange={handleChange} value={colaborador?.cnpj} name='cnpj'/>
                            <label htmlFor="floatingInputGrid">CNPJ</label>
                        </div>
                 </div>
                   
   
                </div>
                <div className="row g-2">
                <div className="col-md">
               <div className="form-floating">
                            <input type="tel" className="form-control" id="floatingInputGrid" onChange={handleChange} value={colaborador?.contato} name='contato'/>
                            <label htmlFor="floatingInputGrid">Contato</label>
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
    export default Cadastro_Clientes