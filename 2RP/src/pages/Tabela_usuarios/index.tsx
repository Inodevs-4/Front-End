import { useEffect, useState } from "react";
import Navbar from "../../components/menu/Navbar";
import './styles.css'
import { Colaborador } from "../../types/Types";
export const Tabela_usuario = () => {



    const [lancamentos, setLancamentos] = useState<Colaborador[]>([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/selectColaboradores`, {
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
                    <div className="col">Email</div>
                    <div className="col">Turno</div>
                    <div className="col">Status</div>
                    <div className="col">Ações</div>
                </div>

                {lancamentos.map((Colaborador) => (
                <div className="row items">
                    <div className="col">{Colaborador?.id}</div>
                    <div className="col">{Colaborador?.nome}</div>
                    <div className="col">{Colaborador?.perfil}</div>
                    <div className="col">{Colaborador?.email}</div>
                    <div className="col">{Colaborador?.turno}</div>
                    <div className="col">{Colaborador?.status}</div>
                    <div className="col">
                        {/* <a className="btn btn-primary" href="/aprovacao-lancamento/viewDetails">Visualizar</a> */}
                    </div>
                </div>
                ))}
            </div>

        </body>
    )
}

export default Tabela_usuario;