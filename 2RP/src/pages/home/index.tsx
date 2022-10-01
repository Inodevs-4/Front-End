// import Menu from "../../components/menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Navbar from '../../components/menu/Navbar';
import { useContext, useEffect, useState } from 'react'
// import Calendar from 'react-calendar';
import "./styled.css";
import { Lancamento } from '../../types/Types'
import { AuthContext } from '../../login/AuthContext';
import { formatarDataHora, formatarInicial } from '../../functions/formatar';

export const Home = () =>{

  const [lancamentos, setLancamentos] = useState<Lancamento[]>([])

  const auth = useContext(AuthContext)

    useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/meusLancamentos/${auth.colaborador?.id}`, {
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

    return(
    <body>
    <Navbar/>

    <div className="container grid">
       <div className="item">
        <p className="Acoes">Bem vindo, {auth.colaborador?.nome} </p>
        <AccountCircleIcon sx={{ fontSize:150 }} />    
        <p className="Acoes">Matricula: {auth.colaborador?.matricula} </p>
        <ul>
          <li>
          <a href="/etapa1">
            <input type="button" value="Apontar horas" id="Apontar"/>
          </a>
          </li>
          <li>
          <a href="/Cadastro">
            <input  type="button" value="Cadastro de Hora" id="Cadastrar"/>
          </a>
          </li>
        </ul>
       </div>
       <div className="item1 row "> 
       <div className="horas">
       <p className="fort"> Horas Trabalhadas</p>
       <h1 className="numero">12 H</h1>
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
        {lancamentos.length !== 0 ? (
          lancamentos.map((lancamento) => (
          <div className='mb-2'>
            <p className="cor">{formatarInicial(lancamento.modalidade)}</p>
            <div className="containerhora">
            <p className="analise esq">{formatarInicial(lancamento.status)}</p>
            <p>Início: {formatarDataHora(String(lancamento.data_inicio))}</p>
            <p>Fim: {formatarDataHora(String(lancamento.data_fim))}</p>
            </div>
          </div>
          ))
          ) : (
            <p>Não há lançamentos cadastrados.</p>
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