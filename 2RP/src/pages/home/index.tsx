import { useState} from "react";
import './style.css';
import Etapa1Form from "../Cadastro_HoraExtra_Apontamento/Etapa1Form";


export const Home = () =>{
    const [matricula,SetEmail] = useState('');
    const [password,SetPassword] = useState('');


    return(
        <div>
            
<h1>Home</h1>

        <a href="/etapa1">Cadastro Hora</a>

        </div>
        
    );
    }
    export default Home