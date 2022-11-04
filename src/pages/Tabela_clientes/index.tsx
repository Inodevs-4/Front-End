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
            <a href="/cadastro-cliente" className='btn btn-primary cadastrar center' data-bs-toggle="tooltip" data-bs-placement="top" title="Cadastrar novo Cliente"><p className="icon">+</p></a>

            <hr />
            <div className="cliente">
                <div className="row titles ">
                    <div className="col center">CNPJ</div>
                    <div className="col center">Nome</div>
                    <div className="col center">Contato</div>
                    <div className="col center">Status</div>
                    <div className="col center">Ações</div>
                </div>

                {clientes && (clientes.map((Clientes) => (
                <div key={Clientes?.cnpj} className="row items">
                    <div className="col matricula center">{Clientes?.cnpj}</div>
                    <div className="col center">{Clientes?.nome}</div>
                    <div className="col center">{Clientes?.contato}</div>
                    {Clientes.status === 'ativo' && <div className="col aprovado center">Ativo</div>}
                    {Clientes.status === 'inativo' && <div className="col reprovado center">Inativo</div>}
                    <div className="col">
                        <a className="btn btn-primary center" href={`/Editar_Clientes/${Clientes.cnpj}`}>Visualizar</a>
                    </div>
                </div>
                )))}
            </div>

        </body>
    )
}

export default Tabela_Clientes;