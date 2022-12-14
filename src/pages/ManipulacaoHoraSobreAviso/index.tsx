import { useEffect, useState } from "react";
import Navbar from "../../components/menu/Navbar";
import './styles.css'
import { Verba } from "../../types/Types";
import { formatarHora } from "../../functions/formatar";
import { todasVerbas } from "../../hooks/Verba";
export const Tabela_projetos = () => {



    const [verbas, setVerbas] = useState<Verba[]>([])

    useEffect(() => {
      (async() => {
        setVerbas(await todasVerbas())
      })()
    }, [])

    return(
        <body>
            <Navbar/>
            <p className="h3">Verbas</p>
            <a href="/cadastro-verba" className='btn btn-primary cadastrar' data-bs-toggle="tooltip" data-bs-placement="top" title="Cadastrar novo Usuário"><p className="icon">+</p></a>

            <hr />
            <div className="apontamentos">
                <div className="row titles">
                    <div className="col">Numero</div>
                    <div className="col">Inicio</div>
                    <div className="col">Fim</div>
                    <div className="col">Adicional</div>
                    <div className="col">Ações</div>
                </div>

                {verbas.map((Verba) => (
                <div key={Verba?.numero} className="row items">
                    <div className="col"><p className="matricula">{Verba?.numero}</p></div>
                    <div className="col">{formatarHora(String(Verba?.inicio))}</div>
                    <div className="col">{formatarHora(String(Verba?.fim))}</div>
                    <div className="col">{Verba?.adicional}</div>
                    <div className="col">
                        <a className="btn btn-primary" href={`/Editar_Verba/${Verba?.numero}`}>Visualizar</a>
                    </div>
                </div>
                ))}
            </div>

        </body>
    )
}

export default Tabela_projetos;