import Menu from "../../components/menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import Calendar from 'react-calendar';
import "./styled.css";


export const Home = () =>{


    return(
    <body>
    <Menu/>

    <div className="container grid">
       <div className="item">
        <p className="Acoes">Bem vindo , Angelo </p>
        <AccountCircleIcon sx={{ fontSize:150 }} />    
        <p className="Acoes">Matricula : 1234556</p>
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
       </div>

       {/* <div className="item">
        <p className="cor">hora extra</p>
        <p className="cor">Sobreavisso</p>
       </div> */}
       
     {/* <a href="/etapa1"> cadastro</a> */}
     </div>
     </body>
    );
    }
    export default Home