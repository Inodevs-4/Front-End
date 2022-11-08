import Navbar from '../../components/menu/Navbar';
import { useState  } from 'react'
import "./styles.css";
import {  Cliente} from '../../types/Types'
import { useNavigate} from 'react-router-dom';
import { salvarCliente} from '../../hooks/Clientes';

export const Cadastro_Clientes = () =>{

    const [cliente, setCliente] = useState<Cliente>()



    function handleChange(e: any) {
        setCliente({...cliente, [e.target.name]: e.target.value})
    }

    const history = useNavigate();

    const salvandoCliente = () => {
        salvarCliente(cliente)
        history('/clientes')

    }

    return(
        <body >
        <Navbar/>
        <div className="edit">
            <h3>Cadastro Clientes</h3>
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="tel" className="form-control" id="floatingInputGrid" onChange={handleChange} value={cliente?.nome} name='nome'/>
                            <label htmlFor="floatingInputGrid">Nome</label>
                        </div>
                    </div>
   
                    <div className="col-md">
                        <div className="form-floating">
                                <input type="number" className="form-control" id="floatingInputGrid" onChange={handleChange} value={cliente?.cnpj} name='cnpj'/>
                                <label htmlFor="floatingInputGrid">CNPJ</label>
                        </div>
                    </div>
                   
   
                </div>
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="tel" className="form-control" id="floatingInputGrid" onChange={handleChange} value={cliente?.contato} name='contato'/>
                            <label htmlFor="floatingInputGrid">Contato</label>
                        </div>
                    </div>
                    <div className="col-md"></div>
                </div>
   
              
                <hr className='linha'/>
                    <div className='alteracao' >
                        <button onClick={salvandoCliente} className='btn btn-success'>Concluir</button>
                    </div>
            </div>
    </body>
    )
    }
    export default Cadastro_Clientes