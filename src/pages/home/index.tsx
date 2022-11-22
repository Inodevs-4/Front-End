// import Menu from "../../components/menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Navbar from '../../components/menu/Navbar';
import { useContext, useEffect, useState } from 'react'
// import Calendar from 'react-calendar';
import "./home.css";
import { Lancamento } from '../../types/Types'
import { AuthContext } from '../../login/AuthContext';
import { formatarDataHora, formatarInicial } from '../../functions/formatar';
import Loading from '../../components/Loading';
import { horasTrabalhadas, meusLancamentos, todosLancamentos } from '../../hooks/Lancamento';

export const Home = () =>{

  const [lancamentos, setLancamentos] = useState<Lancamento[]>([])
  const [horas, setHoras] = useState<{horas?: number}>({})
  const [removeLoading, setRemoveLoading] = useState(false)
  const [removeLoading2, setRemoveLoading2] = useState(false)

  const auth = useContext(AuthContext)

    useEffect(() => {
      (async() => {
        setLancamentos(await meusLancamentos(String(auth.colaborador?.matricula)))
        setRemoveLoading(true)
      })()
  }, [])

  useEffect(() => {
    (async() => {
      setHoras(await horasTrabalhadas(String(auth.colaborador?.matricula)))
      setRemoveLoading2(true)
    })()
    }, [])
    
    const [mLancamentos, setMLancamentos] = useState<Lancamento[]>([])

    useEffect(() => {
      (async() => {
          setMLancamentos(await todosLancamentos())
      })()
  }, [])  


    return(
    <body>
    <Navbar/>

    <div className="container grid">
       <div className="item">
        <p className="Acoes">Bem-vindo(a), {auth.colaborador?.nome}! </p>
        <AccountCircleIcon sx={{ fontSize:150 }} />    
        <p className="Acoes">Matrícula: {auth.colaborador?.matricula} </p>
        <ul>
          <li>
          <a href="/etapa1">
            <input type="button" value="Apontar horas" id="Apontar"/>
          </a>
          </li>
          <li>
          <a href="/aprovacao-lancamento">
            <input  type="button" value="Visualizar apontamentos" id="Cadastrar"/>
          </a>
          </li>
        </ul>
       </div>
       <div className="item1 row "> 
       <div className="horas">
       <p className="fort"> Horas Trabalhadas</p>
       {!removeLoading && <Loading/>}
       {(!removeLoading2 || horas.horas !== -1) && <h1 className="numero">{horas.horas} H</h1>}
       </div>
       <div className="apontamento">
        <h1>Últimos Apontamentos</h1>
        <p>Falta 1 dia para o fechamento</p>
       </div>
       <ArrowForwardIcon sx={{ fontSize: 60 }}/>
       {/*
       <div className="Horaextra">
       <p className="cor ">Horas Extras</p>
       <div className="containerhora">
        <p className="analise esq">Em Analise</p>
        <p >sexta-feira</p>
        <p>12h-15</p>
        </div>
        <p className="cor">Analise</p>
        <div className="containerhora">
        <p className="aprovado esq">Aprovado</p>
        <p>sexta-feira a Domingo</p>
        <p>01/08/2022 a 05/08/2022 </p>
        </div>
       </div>
      */}

      <div className="Horaextra">
        {!removeLoading && <Loading/>}
        {!removeLoading || lancamentos.length !== 0 ? (
          lancamentos.map((lancamento) => (
          <div className='mb-2' key={lancamento.id}>
            <p className="cor">{formatarInicial(lancamento.modalidade)}</p>
            <div className="containerhora">
            {lancamento.status === 'aprovado' && <p className="aprovado esq">Aprovado</p>}
            {lancamento.status === 'reprovado' && <p className="reprovado esq">Reprovado</p>}
            {lancamento.status === 'pendente' && <p className="analise esq">Pendente</p>}
            <p>Início: {formatarDataHora(String(lancamento.data_inicio))}</p>
            <p>Fim: {formatarDataHora(String(lancamento.data_fim))}</p>
            </div>
          </div>
          ))
          ) : (
            <p>Não há lançamentos cadastrados</p>
          )
        }

       </div>
       </div>
       

       {/* <div className="item">
        <p className="cor">hora extra</p>
        <p className="cor">Sobreavisso</p>
       </div>
       
     {/* <a href="/etapa1"> cadastro</a> */}
     </div>
     </body>
    );
    }
    export default Home