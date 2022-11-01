import { useEffect, useState } from "react";
import Navbar from "../../components/menu/Navbar";
import './styles.css'
import { Colaborador } from "../../types/Types";
import { formatarInicial } from "../../functions/formatar";
export const Tabela_usuario = () => {



    const [colaboradores, setColaboradores] = useState<Colaborador[]>([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/selectColaboradores`, {
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
            <p className="h3">Tabela Usuarios</p>
            <a href="/cadastro-usuario" className='btn btn-primary cadastrar' data-bs-toggle="tooltip" data-bs-placement="top" title="Cadastrar novo Usuário"><p className="icon">+</p></a>

            <hr />
            <div className="apontamentos">
                <div className="row titles">
                    <div className="col">Matricula</div>
                    <div className="col">Nome</div>
                    <div className="col">Nivel de acesso</div>
                    <div className="col">Email</div>
                    <div className="col">Turno</div>
                    <div className="col">Status</div>
                    <div className="col">Ações</div>
                </div>

                {colaboradores.map((Colaborador) => (
                <div key={Colaborador?.matricula} className="row items">
                    <div className="col"><p className="matricula">{Colaborador?.matricula}</p></div>
                    <div className="col">{Colaborador?.nome}</div>
                    <div className="col">{formatarInicial(Colaborador?.perfil)}</div>
                    <div className="col">{Colaborador?.email}</div>
                    <div className="col">{Colaborador?.turno}</div>
                    {Colaborador.status === 'ativo' && <div className="col aprovado">Aprovado</div>}
                    {Colaborador.status === 'inativo' && <div className="col reprovado">Reprovado</div>}
                    <div className="col">
                        <a className="btn btn-primary" href={`/editUsuario/${Colaborador.matricula}`}>Visualizar</a>
                    </div>
                </div>
                ))}
            </div>

        </body>
    )
}

export default Tabela_usuario;