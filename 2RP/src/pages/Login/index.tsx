import { useState} from "react";
import './style.css';




export const Login = () =>{
    const [matricula,SetEmail] = useState('');
    const [password,SetPassword] = useState('');


    return(
        <div className="container">
           <h1 className='titulo'>Entrar</h1>
            <div className="containerbt">

            <input type="text" 
            className='btn botao' 
            placeholder='Matricula '
            // value={matricula}
           />
            <input type="Password" 
            className='btn botao' 
            placeholder='Senha '
            // value={password}
            />
            <input type="submit" 
            className="btnsubmit botao"
             />
             
            {/* <input type="checkbox" 
            name="remember" 
            id="remember"
             /> 
             <p>Lembre de mim</p> */}
            
         
            </div>
        </div>
    );
    }
    export default Login