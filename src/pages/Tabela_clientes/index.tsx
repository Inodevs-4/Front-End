import { useEffect, useState } from "react";
import Navbar from "../../components/menu/Navbar";
import './styles.css'
import {  Cliente } from "../../types/Types";
import { todosClientes} from '../../hooks/Clientes';

export const Tabela_Clientes = () => {
  
    const [clientes, setClientes] = useState<Cliente[]>([])

      useEffect(() => {
        (async() => {
            setClientes(await todosClientes())
        })()
    }, [])  

    return(
        <body>
            <Navbar/>
            <p className="h3">Tabela Clientes</p>
            <a href="/cadastro-cliente" className='btn btn-primary cadastrar' data-bs-toggle="tooltip" data-bs-placement="top" title="Cadastrar novo Usuário"><p className="icon">+</p></a>

            <hr />
            <div className="apontamentos">
                <div className="row titles">
                    <div className="col">Nome</div>
                    <div className="col">CNPJ</div>
                    <div className="col">Contato</div>
                    {/* <div className="col">Status</div> */}
                    <div className="col">Ações</div>
                </div>

                {clientes.map((Projetos) => (
                <div key={Projetos?.cnpj} className="row items">
                    <div className="col"><p className="matricula">{Projetos?.nome}</p></div>
                    <div className="col">{Projetos?.cnpj}</div>
                    <div className="col">{Projetos?.contato}</div>
                    {/* <div className="col">{Projetos?.status}</div> */}
                    <div className="col">
                        <a className="btn btn-primary" href={`/Editar_Clientes/${Projetos.cnpj}`}>Visualizar</a>
                    </div>
                </div>
                ))}
            </div>

        </body>
    )
}

export default Tabela_Clientes;