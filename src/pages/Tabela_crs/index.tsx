import { useEffect, useState } from "react";
import Navbar from "../../components/menu/Navbar";
import "./cliente.css";
import { CR } from "../../types/Types";
import { todosCRs } from "../../hooks/CR";

export const CRs = () => {

    const [crs, setCrs] = useState<CR[]>
    ([])

        useEffect(() => {
            (async() => {
                setCrs(await todosCRs())
            })()
    }, [])  
    return(
        <body>
            <Navbar/>
            <p className="h3">Tabela CRs</p>
            <a href="/cadastro-cr" className='btn btn-primary cadastrar' data-bs-toggle="tooltip" data-bs-placement="top" title="Cadastrar novo CR"><p className="icon">+</p></a>
            <hr />

            <div className="crs">
                 <div className="row titles">
                    <div className="col">Número</div>
                    <div className="col">Nome</div>
                    <div className="col">Colaboradores</div>
                    <div className="col">Status</div>
                    <div className="col">Ações</div>
                 </div>

                 {crs && (crs.map((CR) => (
                <div key={CR?.numero} className="row items">
                    <div className="col"><p className="matricula">{CR?.numero}</p></div>
                    <div className="col nome">{CR?.nome}</div>
                    {/* <div className="col nome">{CR.colaboradores?.nome}</div> */}
                    {CR.status === 'ativo' && <div className="col aprovado">Ativo</div>}
                    {CR.status === 'inativo' && <div className="col reprovado">Inativo</div>}
                    <div className="col">
                        <a className="btn btn-primary" href={`/editar-cr/${CR.numero}`}>Visualizar</a>
                    </div>
                </div>
                )))} 
            </div>


        </body>
    )
}

export default CRs;