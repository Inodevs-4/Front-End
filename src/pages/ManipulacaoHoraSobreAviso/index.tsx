import { useEffect, useState } from "react";
import Navbar from "../../components/menu/Navbar";
import './styles.css'
import { Verba } from "../../types/Types";
import { formatarDataHora } from "../../functions/formatar";
export const Tabela_projetos = () => {



    const [verbas, setVerbas] = useState<Verba[]>([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/todasVerbas`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setVerbas(data)
          })
      }, [])

    return(
        <body>
            <Navbar/>
            <p className="h3">Verbas</p>
            <a href="/cadastro-verba" className='btn btn-primary cadastrar' data-bs-toggle="tooltip" data-bs-placement="top" title="Cadastrar novo Usuário"><p className="icon">+</p></a>

            <hr />
            <div className="apontamentos">
                <div className="row titles">
                    <div className="col">ID</div>
                    <div className="col">Numero</div>
                    <div className="col">Inicio</div>
                    <div className="col">Fim</div>
                    <div className="col">Adicional</div>
                    <div className="col">Ações</div>
                </div>

                {verbas.map((Verba) => (
                <div key={Verba?.numero} className="row items">
                    <div className="col"><p className="matricula">{Verba?.numero}</p></div>
                    <div className="col">{Verba?.numero}</div>
                    <div className="col">{formatarDataHora(String(Verba?.inicio))}</div>
                    <div className="col">{formatarDataHora(String(Verba?.fim))}</div>
                    <div className="col">{Verba?.adicional}</div>
                    <div className="col">
                        <a className="btn btn-primary" href={`/Editar_Verba/${Verba?.id}`}>Visualizar</a>
                    </div>
                </div>
                ))}
            </div>

        </body>
    )
}

export default Tabela_projetos;