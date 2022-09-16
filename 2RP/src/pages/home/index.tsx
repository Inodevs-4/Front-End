import Menu from "../../components/menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./styled.css"


export const Home = () =>{


    return(
    <body>
    <Menu/>

    <div className="container grid">
       <div className="item">
        <p>Bem vindo </p>
        <AccountCircleIcon sx={{ fontSize:150 }} />    
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
       <div className="item"> <p>Apontamento de horas </p>
       <p>Falta um hora </p>
       
       
       
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