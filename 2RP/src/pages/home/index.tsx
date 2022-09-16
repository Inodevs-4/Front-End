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
       <div className="item row"> 
       <div className="horas">
       <p> HORAS TRABALHADAS</p>
       </div>
       <div className="Horaextra">
       <p>horas extras</p>
       </div>
       </div>

       <div className="item">
        <p>hora extra</p>
        <p>Sobreavisso</p>
       </div>
       
     {/* <a href="/etapa1"> cadastro</a> */}
     </div>
     </body>
    );
    }
    export default Home