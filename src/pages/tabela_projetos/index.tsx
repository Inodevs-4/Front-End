import { useEffect, useState } from "react";
import Navbar from "../../components/menu/Navbar";
import './styles.css'
import {  Projeto } from "../../types/Types";
import { todosProjetos} from '../../hooks/Projeto';

export const Tabela_projetos = () => {
  
    const [projetos, setProjetos] = useState<Projeto[]>([])

      useEffect(() => {
        (async() => {
            setProjetos(await todosProjetos())
        })()
    }, [])  

    console.log(projetos)
    return(
        <body>
            <Navbar/>
            <p className="h3">Tabela de Projetos</p>
            <a href="/Cadastro_projeto" className='btn btn-primary cadastrar' data-bs-toggle="tooltip" data-bs-placement="top" title="Cadastrar novo projeto"><p className="icon">+</p></a>

            <hr />
            <div className="apontamentos">
                <div className="row titles">
                    <div className="col center">ID</div>
                    <div className="col center">Nome</div>
                    <div className="col center">Status</div>
                    <div className="col center ">Ações</div>
                </div>

                {projetos.map((Projetos) => (
                <div key={Projetos?.id} className="row items">
                    <div className="col center"><p className="matricula center">{Projetos?.id}</p></div>
                    <div className="col  center">{Projetos?.nome}</div>
                    {Projetos.status === 'ativo' && <div className="col aprovado center">Ativo</div>}
                    {Projetos.status === 'inativo' && <div className="col reprovado center">Inativo</div>}
                    <div className="col">
                        <a className="btn btn-primary center" href={`/Editar_Projetos/${Projetos.id}`}>Visualizar</a>
                    </div>
                </div>
                ))}
            </div>

        </body>
    )
}

export default Tabela_projetos;