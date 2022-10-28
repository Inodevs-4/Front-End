import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Navbar from "../../components/menu/Navbar";
import { formatarDataHora, formatarInicial } from "../../functions/formatar";
import { todosLancamentos } from "../../hooks/Lancamento";
import { Lancamento } from "../../types/Types";
import './styles.css'

export const Aprovacao = () => {

    const [lancamentos, setLancamentos] = useState<Lancamento[]>([])
    const [removeLoading, setRemoveLoading] = useState(false)

    useEffect(() => {
        (async() => {
            setLancamentos(await todosLancamentos())
        })()
        setRemoveLoading(true)
      }, [])

    return(
        <body>
            <Navbar/>
            <p className="h3">Tabela de apontamentos</p>
            <hr />
            <div className="apontamentos">
                <div className="row titles">
                    <div className="col">ID</div>
                    <div className="col">Nome</div>
                    <div className="col">Modalidade</div>
                    <div className="col">Início</div>
                    <div className="col">Fim</div>
                    <div className="col">Status</div>
                    <div className="col">Ações</div>
                </div>
                {!removeLoading && <Loading/>}
                {!removeLoading || lancamentos.map((lancamento) => (
                <div className="row items">
                    <div className="col">{lancamento.id}</div>
                    <div className="col">{lancamento.colaborador?.nome}</div>
                    <div className="col">{formatarInicial(lancamento.modalidade)}</div>
                    <div className="col">{formatarDataHora(String(lancamento.data_inicio))}</div>
                    <div className="col">{formatarDataHora(String(lancamento.data_fim))}</div>
                    <div className="col">{formatarInicial(lancamento.status)}</div>
                    <div className="col">
                        <a className="btn btn-primary" href={`/Detalhes_Apontamento/${lancamento.id}`}>Visualizar</a>
                    </div>
                </div>
                ))}
                {/*
                <div className="row items">
                    <div className="col">32312312</div>
                    <div className="col">Fulano Ciclano Beltrano</div>
                    <div className="col">Hora extra</div>
                    <div className="col">XX/XX/XXXX</div>
                    <div className="col">XX/XX/XXXX</div>
                    <div className="col"><span className="badge bg-warning text-light">Pendente</span></div>
                    <div className="col">
                        <a className="btn btn-primary" href="/aprovacao-lancamento/viewDetails">Visualizar</a>
                    </div>
                </div>

                <div className="row items">
                    <div className="col">32312312</div>
                    <div className="col">Fulano Ciclano Beltrano</div>
                    <div className="col">Hora extra</div>
                    <div className="col">XX/XX/XXXX</div>
                    <div className="col">XX/XX/XXXX</div>
                    <div className="col"><span className="badge bg-danger text-light">Reprovado</span></div>
                    <div className="col">
                        <a className="btn btn-primary">Visualizar</a>
                    </div>
                </div>
                */}
            </div>

        </body>
    )
}

export default Aprovacao;