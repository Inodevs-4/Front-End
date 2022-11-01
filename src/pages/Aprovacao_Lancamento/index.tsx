import { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Navbar from "../../components/menu/Navbar";
import { formatarDataHora, formatarInicial } from "../../functions/formatar";
import { gestorLancamentos, todosLancamentos } from "../../hooks/Lancamento";
import { AuthContext } from "../../login/AuthContext";
import { Lancamento } from "../../types/Types";
import './styles.css'

export const Aprovacao = () => {

    const [lancamentos, setLancamentos] = useState<Lancamento[]>([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const auth = useContext(AuthContext)


    useEffect(() => {
        (async() => {
            if (auth.colaborador?.perfil === 'gestor') {
                setLancamentos(await gestorLancamentos(String(auth.colaborador?.matricula)))
            } else {
                setLancamentos(await todosLancamentos())
            }
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
                    {lancamento.status === 'aprovado' && <div className="col aprovado">Aprovado</div>}
                    {lancamento.status === 'reprovado' && <div className="col reprovado">Reprovado</div>}
                    {lancamento.status === 'pendente' && <div className="col pendente">Pendente</div>}
                    <div className="col">
                        <a className="btn btn-primary" href={`/Detalhes_Apontamento/${lancamento.id}`}>Visualizar</a>
                    </div>
                </div>
                ))}
            </div>

        </body>
    )
}

export default Aprovacao;