import { useEffect, useState } from "react";
import Navbar from "../../components/menu/Navbar";
import './styles.css'
import {  Projeto } from "../../types/Types";
// import { formatarInicial } from "../../functions/formatar";
export const Tabela_projetos = () => {



    const [colaboradores, setColaboradores] = useState<Projeto[]>([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/selectProjetos`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setColaboradores(data)
          })
      }, [])

    return(
        <body>
            <Navbar/>
            <p className="h3">Tabela Projetos</p>
            <a href="/Cadastro_projeto" className='btn btn-primary cadastrar' data-bs-toggle="tooltip" data-bs-placement="top" title="Cadastrar novo Usuário"><p className="icon">+</p></a>

            <hr />
            <div className="apontamentos">
                <div className="row titles">
                    <div className="col">ID</div>
                    <div className="col">Nome</div>
                    {/* <div className="col">Cliente</div> */}
                    {/* <div className="col">CR</div> */}
                    <div className="col">Status</div>
                    <div className="col">Ações</div>
                </div>

                {colaboradores.map((Colaborador) => (
                <div key={Colaborador?.id} className="row items">
                    <div className="col"><p className="matricula">{Colaborador?.id}</p></div>
                    <div className="col">{Colaborador?.nome}</div>
                    {/* <div className="col">{Colaborador.cr?.nome}</div> */}
                    <div className="col">{Colaborador?.status}</div>
                    <div className="col">
                        <a className="btn btn-primary" href={`/Editar_Projetos/${Colaborador.id}`}>Visualizar</a>
                    </div>
                </div>
                ))}
            </div>

        </body>
    )
}

export default Tabela_projetos;