import { useState } from "react"
import Navbar from "../../components/menu/Navbar"
import { salvarColaborador } from "../../hooks/Colaborador"
import { Cliente } from "../../types/Types"
import './styles.css'

export const Cadastro_Cliente = () => {
    const [cliente, setCliente] = useState<Cliente>()
    // const salvandoCliente = () => {
    //     salvarColaborador(cliente)
    // }
    return(
        <body>
            <Navbar/>

            <div className="client">
                <h3>Cliente</h3>

                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className="form-control cnpj" id="floatingInputGrid" name="cnpj"/>
                            <label htmlFor="floatingInputGrid">CNPJ</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className="form-control contato" id="floatingInputGrid" name="contato"/>
                            <label htmlFor="floatingInputGrid">Contato</label>
                        </div>
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control nome" id="floatingInputGrid nome" name='nome' />
                    <label htmlFor="floatingInputGrid">Nome</label>
                </div>
                <button className="btn btn-primary cadastrar1" >Cadastrar</button>

            </div>

        </body>
    )
}

export default Cadastro_Cliente;