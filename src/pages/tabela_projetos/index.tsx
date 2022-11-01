import { useEffect, useState } from "react";
import Navbar from "../../components/menu/Navbar";
import './styles.css'
import {  Projeto } from "../../types/Types";
import { todosProjetos} from '../../hooks/Projeto';
// import { formatarInicial } from "../../functions/formatar";
export const Tabela_projetos = () => {



    const [projetos, setProjetos] = useState<Projeto[]>([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/todosProjetos`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProjetos(data)
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
                    <div className="col">Status</div>
                    <div className="col">Ações</div>
                </div>

                {projetos.map((Projetos) => (
                <div key={Projetos?.id} className="row items">
                    <div className="col"><p className="matricula">{Projetos?.id}</p></div>
                    <div className="col">{Projetos?.nome}</div>
                    {Projetos.status === 'ativo' && <div className="col aprovado">Aprovado</div>}
                    {Projetos.status === 'inativo' && <div className="col reprovado">Reprovado</div>}
                    <div className="col">
                        <a className="btn btn-primary" href={`/Editar_Projetos/${Projetos.id}`}>Visualizar</a>
                    </div>
                </div>
                ))}
            </div>

        </body>
    )
}

export default Tabela_projetos;