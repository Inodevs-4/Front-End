import { useEffect, useState } from "react";
import Navbar from "../../components/menu/Navbar";
import './styles.css'
import { Lancamento } from "../../types/Types";
export const Tabela_usuario = () => {



    const [lancamentos, setLancamentos] = useState<Lancamento[]>([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/todosLancamentos`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setLancamentos(data)
          })
      }, [])

    return(
        <body>
            <Navbar/>
            <p className="h3">Tabela Usuarios</p>
            <hr />
            <div className="apontamentos">
                <div className="row titles">
                    <div className="col">ID</div>
                    <div className="col">Nome</div>
                    <div className="col">Nivel de acesso</div>
                    <div className="col">matricula</div>
                    <div className="col">Ações</div>
                </div>

                {lancamentos.map((lancamento) => (
                <div className="row items">
                    <div className="col">{lancamento.id}</div>
                    <div className="col">{lancamento.colaborador?.nome}</div>
                    <div className="col">{lancamento.colaborador?.perfil}</div>
                    <div className="col">{lancamento.colaborador?.matricula}</div>
                    <div className="col">
                        <a className="btn btn-primary" href="/editUsuario">Visualizar</a>
                    </div>
                </div>
                ))}
            </div>

        </body>
    )
}

export default Tabela_usuario;