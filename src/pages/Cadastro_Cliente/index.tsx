import { useState, useEffect } from "react"
import Navbar from "../../components/menu/Navbar"
import { salvarCliente } from "../../hooks/Clientes"
import { Cliente } from "../../types/Types"
import { useNavigate } from "react-router-dom"
import './styles.css'

export const Cadastro_Cliente = () => {
    const [cliente, setCliente] = useState<Cliente>()

    const history = useNavigate()

    const[isDisabled] = useState(true);

    function handleChange(e:any) {
        setCliente({...cliente, [e.target.nome]: e.target.value})
    }

    const salvandoCliente = () => {
        salvarCliente(cliente)
        history('/clientes')
    }

    return(
        <body>
            <Navbar/>

            <div className="client">
                <h3>Novo Cliente</h3>

                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="number" className="form-control cnpj" onChange={handleChange} value={cliente?.cnpj} id="floatingInputGrid" name="cnpj"/>
                            <label htmlFor="floatingInputGrid">CNPJ</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className="form-control contato" onChange={handleChange} value={cliente?.contato} id="floatingInputGrid" name="contato"/>
                            <label htmlFor="floatingInputGrid">Contato</label>
                        </div>
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control nome" id="floatingInputGrid nome" onChange={handleChange} value={cliente?.nome} name='nome' />
                    <label htmlFor="floatingInputGrid">Nome</label>
                </div>
                <button className="btn btn-primary cadastrar1" onClick={salvandoCliente}>Cadastrar</button>

            </div>

        </body>
    )
}

export default Cadastro_Cliente;