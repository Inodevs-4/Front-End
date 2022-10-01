import { useEffect, useState } from "react";
import Navbar from "../../components/menu/Navbar";
import { Lancamento } from "../../types/Types";
import './styles.css'

export const Aprovacao = () => {

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

    const formatarDataHora = (dataHora: string | undefined) => {
        if (dataHora === undefined){
        return ''
        } else {
        const horas = String(Number(dataHora.split('T')[1].split(':')[0]) - 3)
        const minutos = dataHora.split('T')[1].split(':')[1]
        const ano = dataHora.split('T')[0].split('-')[0]
        const mes = dataHora.split('T')[0].split('-')[1]
        const dia = dataHora.split('T')[0].split('-')[2]
        return horas + ':' + minutos + ' ' + dia + '/' + mes + '/' + ano
        }
    }

    const formatarInicial = (status: string | undefined) => {
        if (status === undefined){
          return ''
        } else {
          return status[0].toUpperCase() + status.substring(1, status.length) 
        }
      }

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
                {lancamentos.map((lancamento) => (
                <div className="row items">
                    <div className="col">{lancamento.id}</div>
                    <div className="col">{lancamento.colaborador?.nome}</div>
                    <div className="col">{lancamento.modalidade}</div>
                    <div className="col">{formatarDataHora(String(lancamento.data_inicio))}</div>
                    <div className="col">{formatarDataHora(String(lancamento.data_fim))}</div>
                    <div className="col">{formatarInicial(lancamento.status)}</div>
                    <div className="col">
                        <a className="btn btn-primary" href="/aprovacao-lancamento/viewDetails">Visualizar</a>
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